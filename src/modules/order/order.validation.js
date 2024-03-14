import joi from "joi";
import { generalfields } from "../../utils/generalfields.js";

export const createOrderSchema = joi
  .object({
    address: joi.string().min(10).max(100).required(),
    phone: joi
      .array()
      .items(
        joi
          .string()
          .pattern(/^01[0-2,5]{1}[0-9]{8}$/)
          .required()
      )
      .required(),
    note: joi.string().min(5).max(200),
    reason: joi.string(),
    paymentType: joi.string().valid("card", "cash"),
    couponName: joi.string().max(15).min(2).trim(),
    products: joi.array().items(
      joi
        .object({
          productId: generalfields.id,
          quantity: joi.number().positive().integer().min(1).required(),
        })
        .required()
    ),
  })
  .required();

export const cancelOrderSchema = joi
  .object({
      orderId:generalfields.id
  })
  .required();

  export const deliveredOrderSchema = joi
    .object({
      orderId: generalfields.id,
    })
  .required();
    
  export const authSchema = joi
    .object({
      auth: joi.string().required(),
    })
    .required();