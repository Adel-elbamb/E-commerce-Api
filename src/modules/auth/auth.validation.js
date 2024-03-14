import Joi from "joi"
import { generalfields } from "../../utils/generalfields.js"


export const signupSchema = Joi.object({
firstName : Joi.string().min(3).max(20).required(),
lastName : Joi.string().min(3).max(20).required(),
email : generalfields.email,
password : generalfields.password,
cpassword : Joi.string().valid(Joi.ref('password')).required(),
DOB : Joi.string().isoDate(),
mobileNumber :Joi.string().trim().pattern(/^01[0-2]\d{8}$/).required(),
role : Joi.string().valid('User','Admin'),
gender:Joi.string().valid('Female','Male'),
status:Joi.string().valid('Offline','Online'),
address : Joi.string(),
image : Joi.string()
}).required()

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
  password: generalfields.password,
  mobileNumber: Joi.string()
    .trim()
    .pattern(/^01[0-2]\d{8}$/),
}).required();

export const authSchema = Joi.object({
        auth: Joi.string().required()
    }).required()

export const sendCodeSchema = Joi.object({
    email: generalfields.email
}).required()

export const forgetPasswordSchema = Joi.object({
    email : generalfields.email,
    newPassword : generalfields.password,
    cPassword : Joi.string().valid(Joi.ref('newPassword')).required(),
    code : Joi.string().pattern(new RegExp(/^\d{5}$/)).required()

}).required()
    
//updatePasswordSchema
export const updatePasswordSchema = Joi.object({
    userId: generalfields.id,
    oldPassword:generalfields.password,
    newPassword:generalfields.password
}).required();

//updateSchema
export const updateSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
  mobileNumber: Joi.string()
    .trim()
    .pattern(/^01[0-2]\d{8}$/),
  recoveryEmail: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
  DOB: Joi.string().isoDate(),
  firstName: Joi.string().min(3).max(20),
  lastName: Joi.string().min(3).max(20),
  userId: generalfields.id,
}).required();

    //delete schema
export const deleteSchema = Joi.object({
    userId : generalfields.id
    }).required()