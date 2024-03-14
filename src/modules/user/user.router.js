import { Router } from "express";
import * as userController from "./controller/user.controller.js";
import auth from "../../middleware/auth.js";
import * as userValidation from "../user/user.validation.js";
import validation from "../../middleware/validation.js";
import userEndpoint from "./user.endpoint.js";
const router = Router();

router
  .patch(
    "/addTowishlist/:productId",
    validation(userValidation.tokenSchema, true),
    auth(userEndpoint.add),
    validation(userValidation.addTowishlistSchema),
    userController.addTowishlist
  )

  .patch(
    "/removeFromWishlist/:productId",
    validation(userValidation.tokenSchema, true),
    auth(userEndpoint.remove),
    validation(userValidation.removeFromWishlistSchema),
    userController.removeFromWishlist
  )
  //get account data
  .get(
    "/getData/:userId",
    validation(userValidation.authSchema, true),
    auth(userEndpoint.getData),
    validation(userValidation.getDataSchema),
    userController.userAccountData
  );
export default router;
