import express,{Router} from "express";
import * as orderController from "./controller/order.controller.js";
import * as orderValidation from "./order.validation.js";
import orderEndpoint from "./order.endpoints.js";
import auth from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
const router = Router();


router.post(
  "/",
  validation(orderValidation.authSchema, true),
  auth(orderEndpoint.createOrder),
  validation(orderValidation.createOrderSchema),
  orderController.createOrder
);

router.put(
  "/cancelOrder/:orderId",
  validation(orderValidation.authSchema, true),
  auth(orderEndpoint.cancelOrder),
  validation(orderValidation.cancelOrderSchema),
  orderController.cancelOrder
);

router.put(
  "/deliverOrder/:orderId",
  validation(orderValidation.authSchema, true),
  auth(orderEndpoint.deliveredOreder),
  validation(orderValidation.deliveredOrderSchema),
  orderController.deliveredOrder
);

router.post('/webhook', express.raw({ type: 'application/json' }), orderController.webhook);

export default router;
