import cartModel from "../../../../DB/model/Cart.model.js";
import productModel from "../../../../DB/model/Product.model.js";
import { asyncHandler } from "../../../utils/asynchandler.js";

//================================create cart =============================
//check if cart exist
//check product exist
//quantity < stock
//check product in cart --> update quantity --> if product not exist --> add 
export const addCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const cartExist = await cartModel.findOne({ userId: req.user._id });
  const product = await productModel.findOne({
    _id: productId,
    stock: { $gte: quantity }
  });
  if (!product) {
    return next(new Error("invalid product"), { cause: 400 });
  }
  if (! cartExist) {
      const cartCreated = await cartModel.create({
        userId: req.user._id,
        products: [{ productId, quantity }],
      });
      return res.status(201).json({message:'cart created',cartCreated})
    }
    let match = false
    //check if product exist 
    for (const product of cartExist.products) {
        if (product.productId == productId) {
            product.quantity = quantity
            match = true
            break;
        }
    }
    if (!match) {
        cartExist.products.push({ productId, quantity });
    }
    await cartExist.save()
     return res.status(200).json({ message: "done", cartExist });
})

export const deleteFromCart= asyncHandler(async (req, res, next) => {
  const { productId} = req.params;
   const product = await productModel.findOne({
     _id: productId
   });
   if (!product) {
     return next(new Error("invalid product"), { cause: 400 });
    }
    const cartExist = await cartModel.findOne({ userId: req.user._id });
    if (!cartExist) {
        return next(new Error("cart not found"), { cause: 404 });
    }
    // 
   const updateCart = await cartModel.findOneAndUpdate({ userId: req.user._id },
        {
            $pull: {
                products: {
                    productId : productId
                }
            }
        },{new:true});
      return res.status(200).json({ message: "done", updateCart })
});

export const removeAllProducts = asyncHandler(async (req, res, next) => {
  const cartExist = await cartModel.findOne({ userId: req.user._id });
  if (!cartExist) {
    return next(new Error("cart not found"), { cause: 404 });
  }
  const updateCart = await cartModel.findOneAndUpdate(
    { userId: req.user._id },
   {products:[]}
   , { new: true }
  );
  return res.status(200).json({ message: "done", updateCart });
});
