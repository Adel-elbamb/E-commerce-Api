import cartModel from "../../../../DB/model/Cart.model.js";
import couponModel from "../../../../DB/model/Coupon.model.js";
import orderModel from "../../../../DB/model/Order.model.js";
import productModel from "../../../../DB/model/Product.model.js";
import { asyncHandler } from "../../../utils/asynchandler.js";
import createInvoice from "../../../utils/createPdf.js";
import sendEmail from "../../../utils/email.js";
import payment from "../../../utils/payment.js";
import Stripe from "stripe";
//========================= create order  =======================================

//order all
//order specifc items
//1-check if coupon
//2-send products
//3-loop product --> check exist
//4- name,unitprice ,totalprice
//5-calc subprice
//6-add product to array
export const createOrder = asyncHandler(async (req, res, next) => {
  let subPrice = 0;
  const allProducts = [];
  let { products, couponName } = req.body;
  let amount = 0;
  if (couponName) {
    const couponExist = await couponModel.findOne({
      name: couponName,
      usedBy: { $nin: req.user._id },
    });
    if (!couponExist || couponExist.expireIn < new Date()) {
      return next(new Error(" invalid coupon "), { cause: 400 });
    }
    req.body.couponId = couponExist._id;
    amount = couponExist.amount;
  }
  if (!products) {
    const cart = await cartModel.findOne({ userId: req.user._id });
    if (!cart || !cart.products.length) {
      return next(new Error("invalid cart"), { cause: 400 });
    }
    products = cart.products.toObject()
  }
  for (const product of products) {
    const productexist = await productModel.findOne({
      _id: product.productId,
      stock: { $gte: product.quantity },
    });
    if (!productexist) {
      return next(new Error("invalid product"), { cause: 400 });
    }
    console.log(products)
   
    //check products in cart
    const productIds = products.map((product) => product.productId);

    const productIncart = await cartModel.findOne({
      userId: req.user._id,
      "products.productId": { $in: productIds },
    })

    if (!productIncart) {
      return next(new Error("product not found in cart"), { cause: 404 });
    }
   
    product.name = productexist.name;
    product.unitPrice = productexist.totalPrice;
    product.finalPrice = product.unitPrice * product.quantity;
    subPrice += product.finalPrice;
    allProducts.push(product);
  }
  req.body.totalPrice = subPrice - (subPrice * amount) / 100;
  req.body.products = allProducts;
  req.body.subPrice = subPrice;
  req.body.userId = req.user._id;
  req.body?.paymentType == "Cash"
    ? (req.body.status = "Placed")
    : (req.body.status = "WaitForpayment");
  for (const product of products) {
    await productModel.updateOne(
      {
        _id: product.productId,
      },
      { $inc: { stock: -parseInt(product.quantity) } }
    );

    await cartModel.updateOne(
      { userId: req.user._id },
      {
        $pull: {
          products: {
            productId: product.productId,
          },
        },
      }
    );
  }
  if (couponName) {
    await couponModel.updateOne(
      {
        _id: req.body.couponId,
      },
      {
        $push: {
          usedBy: req.user._id,
        },
      }
    );
  }
  const order = await orderModel.create(req.body);
  //create invoice
  const invoice = {
    shipping: {
      name: req.user.userName,
      address: order.address,
      city: "elsharkya",
      state: "cairo",
      country: "Egypt",
      postal_code: 94111,
    },
    items: order.products,
    subtotal: subPrice,
    paid: 0,
    invoice_nr: order._id.toString(),
    createAt: order.createdAt,
  };
  createInvoice(invoice, "invoice.pdf");
  await sendEmail({
    to: req.user.email,
    subject: "invoice",
    attachments: [
      {
        path: "invoice.pdf",
        application:'application/pdf'
      },
    ],
  });

  //payment
  //1-payment method card
  if (order.paymentType == "card") {
    const stripe = new Stripe(process.env.API_KEY_PAYMENT);
    let createCoupon;
    if (couponName) {
      createCoupon = await stripe.coupons.create({
        percent_off: amount,
        duration: "once",
      });
    }
    const session = await payment({
      metadata: {
        orderId: order._id.toString(),
      },
      success_url: `${process.env.SUCCESS_URL}/${order._id}`,
      cancel_url: `${process.env.CANCEL_URL}/${order._id}`,
      customer_email: req.user.email,
      line_items: order.products.map((element) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: element.name,
            },
            unit_amount: element.unitPrice * 100,
          },
          quantity: element.quantity,
        };
      }),
      discounts: couponName ? [{ coupon: createCoupon.id }] : [],
    });
    return res.json({
      message: "done",
      session,
      order,
    });
  }
  return res.json({
    message: "done",
    order,
  });
});
//in two condition waitforpayment , placed
export const cancelOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await orderModel.findOne({
    _id: orderId,
    userId: req.user._id,
  });
  if (!order) {
    return next(new Error("invalid order"), { cause: 404 });
  }
  if (order.status == "Placed" || order.status == "WaitForpayment") {
    for (const product of order.products) {
      await productModel.updateOne(
        {
          _id: product.productId,
        },
        { $inc: { stock: parseInt(product.quantity) } }
      );
    }
    if (order.couponId) {
      await couponModel.updateOne(
        {
          _id: order.couponId,
        },
        {
          $pull: {
            usedBy: req.user._id,
          },
        }
      );
    }
    order.status = "Canceld";
    await order.save();
    return res.status(200).json({ message: "done", order })
  } else {
    return next(new Error("you can't cancel the order"), { cause: 400 });
  }
});

export const deliveredOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await orderModel.findById({ _id: orderId });
  if (!order) {
    return next(new Error("invalid order"), { cause: 404 });
  }
  if (order.status != "Onway") {
    return next(new Error("invalid deliverd order"), { cause: 400 });
  }
  order.status = "Deliverd";
  order.updatedBy = req.user._id;
  await order.save();
  return res.status(200).json({ message: "done", order });
});

//get all orders of user with prices
//onway- rejected

export const webhook = asyncHandler(async (req, res, next) => {
     const stripe = new Stripe(process.env.API_KEY_PAYMENT);
    const endpointSecret = process.env.END_POINT_SECRET;

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
  if (event.type == "checkout.session.completed") {
    let orderId = event.data.object.metadata.orderId;
    const update = await orderModel.updateOne(
      { _id: orderId },
      { status: "Placed" }
    );
   return res.json({message:"done"}) //back in stripe
  }
  return next(new Error('failed to payment'),{cause:500})
})
