import Joi from "joi";
import { generalfields } from "../../utils/generalfields.js";

export const authSchema = Joi.object({
  auth: Joi.string().required(),
}).required();

export const addTowishlistSchema = Joi.object({
  auth: Joi.string().required(),
}).required();

export const removeFromWishlistSchema = Joi.object({
  auth: Joi.string().required(),
}).required();

    //get account data
export const getDataSchema = Joi.object({
        userId : generalfields.id
        }).required()