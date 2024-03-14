import joi from "joi"
import { generalfields } from "../../utils/generalfields.js"

export const addTocartSchema = joi.object({
    productId:generalfields.id,
    quantity: joi.number().positive().integer().min(1).required()

}).required()

export const deleteFromCartSchema = joi
  .object({
    productId: generalfields.id,
  })
  .required();

  export const authSchema = joi
    .object({
      auth: joi.string().required(),
    })
    .required();