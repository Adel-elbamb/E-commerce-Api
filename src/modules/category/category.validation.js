import joi from 'joi'
import { generalfields } from '../../utils/generalfields.js'
export const onecategorySchema = joi.object({
    categoryId : generalfields.id
}).required().messages({
    'custom' : 'invalid-id'
})

export const addCategorySchema = joi.object({
    name : joi.string().max(15).min(2).trim().required(),
    file : generalfields.file.required()
}).required()

export const updatecategorySchema = joi.object({
    name : joi.string().max(15).min(2).trim(),
    file : generalfields.file,
    categoryId : generalfields.id
}).required()

export const authSchema = joi.object({
  auth: joi.string().required(),
}).required();

