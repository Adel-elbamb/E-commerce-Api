import Stripe from 'stripe'
async function payment({
    line_items = [],
    mode = 'payment',
    payment_method_types = ['card'],
    discounts = [],
    metadata = {},
    customer_email,
    success_url = process.env.SUCCESS_URL,
    cancel_url = process.env.CANCEL_URL,
} = {}) {
    const stripe = new Stripe(process.env.API_KEY_PAYMENT)
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode,
        metadata,
        payment_method_types,
        discounts,
        customer_email,
        success_url,
        cancel_url,
    })
    return session;
}


export default payment


 // in setion 
// line_items = [{
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name
//                 },
//                 unit_amount:""
//       },
//       quantity: 1,
//     }],