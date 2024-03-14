import joi from 'joi'
import { generalfields } from '../../utils/generalfields.js'

export const oneCouponSchema = joi.object({
    couponId : generalfields.id
}).required()

export const addCouponSchema = joi
  .object({
    name: joi.string().max(15).min(2).trim().required(),
    file: generalfields.file,
    amount: joi.number().positive().min(1).max(100).required(),
    expireIn: joi.date().greater(new Date()).required()
  })
  .required();

export const updateCouponSchema = joi.object({
    name : joi.string().max(15).min(2).trim(),
    amount : joi.number().positive().min(1).max(100),
    file : generalfields.file,
    expireIn: joi.date().greater(new Date()),
    couponId : generalfields.id
}).required()

export const authSchema = joi
  .object({
    auth: joi.string().required(),
  })
  .required();

