import joi from 'joi'
import { generalfields } from '../../utils/generalfields.js'
export const oneSubCategorySchema = joi.object({
    subCategoryId : generalfields.id,
    categoryId : generalfields.id

}).required()

export const addSubCategorySchema = joi.object({
    name : joi.string().max(15).min(2).trim().required(),
    file : generalfields.file.required(),
    categoryId: generalfields.id
}).required()

export const updateSubCategorySchema = joi.object({
    name : joi.string().max(15).min(2).trim(),
    file : generalfields.file,
    subCategoryId : generalfields.id,
    categoryId : generalfields.id
}).required()

export const authSchema = joi
  .object({
    auth: joi.string().required(),
  })
  .required();
