import joi from 'joi'
import { generalfields } from '../../utils/generalfields.js'
export const oneBrandSchema = joi.object({
    brandId : generalfields.id
}).required().messages({
    'custom' : 'invalid-id'
})

export const addBrandSchema = joi.object({
    name : joi.string().max(15).min(2).trim().required(),
    file : generalfields.file.required()
}).required()

export const updateBrandSchema = joi.object({
    name : joi.string().max(15).min(2).trim(),
    file : generalfields.file,
    brandId : generalfields.id
}).required()

export const authSchema = joi
  .object({
    auth: joi.string().required(),
  })
  .required();
