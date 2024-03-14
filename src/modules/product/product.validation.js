import joi from 'joi'
import { generalfields } from '../../utils/generalfields.js'

export const addProductSchema = joi.object({
name:joi.string().min(3).max(30).required(),
categoryId:generalfields.id,
subcategoryId:generalfields.id,
brandId:generalfields.id,
price:joi.number().min(1).positive().required(),
discount:joi.number().min(1).max(100).positive(),
stock:joi.number().integer().positive().min(1).required(),
files : joi.object({
    mainImage : joi.array().items(generalfields.file.required()).required(),
    subImage : joi.array().items(generalfields.file)
}),
description : joi.string().min(5).max(1000),
colors :joi.array().items(joi.string().required()) ,
sizes : joi.array().items(joi.string().required())
}).required()

export const oneProductSchema =joi.object({
    productId:generalfields.id
}).required()

export const authSchema = joi
  .object({
    auth: joi.string().required(),
  })
    .required();
  
    
export const updateProductSchema = joi
    .object({
      productId:generalfields.id,
    name: joi.string().min(3).max(30),
    categoryId: generalfields.id,
    subcategoryId: generalfields.id,
    brandId: generalfields.id,
    price: joi.number().min(1).positive(),
    discount: joi.number().min(1).max(100).positive(),
    stock: joi.number().integer().positive().min(1),
    files: joi.object({
      mainImage: joi.array().items(generalfields.file.required()),
      subImage: joi.array().items(generalfields.file),
    }),
    description: joi.string().min(5).max(1000),
    colors: joi.array().items(joi.string().required()),
    sizes: joi.array().items(joi.string().required()),
  })
  .required();