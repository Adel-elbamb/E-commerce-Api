import Router from 'express'
import * as productController from './controller/product.controller.js'
import uploadFilecloud, { fileValidation } from '../../utils/multer.js'
import auth from '../../middleware/auth.js'
import productEndpoint from './product.endpoint.js'
import validation from '../../middleware/validation.js'
import * as productValidation from './product.validation.js'



const router = Router()

router
  .post(
    "/",
    validation(productValidation.authSchema, true),
    auth(productEndpoint.create),
    uploadFilecloud(fileValidation.image).fields([
      {
        name: "mainImage",
        maxCount: 1,
      },
      {
        name: "subImage",
        maxCount: 5,
      },
    ]),
    validation(productValidation.addProductSchema),
    productController.addProduct
  )

  .get("/", productController.allProducts)

  .get(
    "/:productId",
    validation(productValidation.oneProductSchema),
    productController.oneProduct
  )

  .put(
    "/:productId",
    validation(productValidation.authSchema, true),
    auth(productEndpoint.update),
    uploadFilecloud(fileValidation.image).fields([
      {
        name: "mainImage",
        maxCount: 1,
      },
      {
        name: "subImage",
        maxCount: 5,
      },
    ]),
    validation(productValidation.updateProductSchema),
    productController.updateProduct
  );

export default router 