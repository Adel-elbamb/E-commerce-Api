import { Router } from "express"
import * as authController from './controller/auth.controller.js'
import validation from "../../middleware/validation.js"
import * as authValidation from './auth.validation.js'
import auth from "../../middleware/auth.js"
import authEndpoint from "./auth.endpoint.js"
const router = Router()
 ///========================================Router ==================================
router
  .post(
    "/signUp",
    validation(authValidation.signupSchema),
    authController.signUp
  )
  .get(
    "/confirmEmail/:token",
    validation(authValidation.tokenSchema),
    authController.confirmEmail
  )
  .get(
    "/refreshToken/:token",
    validation(authValidation.tokenSchema),
    authController.refreshToken
  )
  .post("/login", validation(authValidation.loginSchema), authController.login)
  .patch(
    "/sendCode",
    validation(authValidation.sendCodeSchema),
    authController.sendCode
  )
  .put(
    "/forgetPassword",
    validation(authValidation.forgetPasswordSchema),
    authController.forgetPassword
  )
  //updatePassword
  .put(
    "/updatePassword/:userId",
    validation(authValidation.authSchema, true),
    auth(authEndpoint.updatePassword),
    validation(authValidation.updatePasswordSchema),
    authController.updatePassword
)

//updateAccount
.put('/update/:userId',
validation(authValidation.authSchema,true),
auth(authEndpoint.updateAccount),
validation(authValidation.updateSchema)
,authController.updateAccount)

//delete account
.delete('/delete/:userId',
validation(authValidation.authSchema,true),
auth(authEndpoint.deleteAccount),
validation(authValidation.deleteSchema),
authController.deleteAccount)
  

export default router