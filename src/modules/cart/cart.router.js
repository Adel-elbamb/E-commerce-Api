import Router from "express";
import * as cartController from './controller/cart.controller.js'
import * as cartValidation from './cart.validation.js'
import  cartEndpoint from './cart.endpoint.js'
import validation from "../../middleware/validation.js"
import auth from "../../middleware/auth.js";
//==============================Router===================================




const router = Router();

router.post('/',
    validation(cartValidation.authSchema, true)
    , auth(cartEndpoint.addTocart),
    validation(cartValidation.addTocartSchema),
    cartController.addCart)

router.patch(
  "/:productId",
  validation(cartValidation.authSchema, true),
  auth(cartEndpoint.deleteFromCart),
  validation(cartValidation.deleteFromCartSchema),
  cartController.deleteFromCart
);

router.patch(
  "/",
  validation(cartValidation.authSchema, true),
  auth(cartEndpoint.deleteFromCart),
  cartController.removeAllProducts
);


export default router;
