import Router from "express"
import uploadFilecloud, { fileValidation } from "../../utils/multer.js"
import * as categoryControl from "./controller/category.controller.js"
import subCategoryRouter from "../subcategory/sucCategory.router.js"
import validation from "../../middleware/validation.js"
import * as categoryValidation from './category.validation.js'
import auth from "../../middleware/auth.js"
import categoryEndpoint from "./category.endpoints.js"
const router = Router()

router.use('/:categoryId/subCategory', subCategoryRouter)
router
  .post(
    "/",
    validation(categoryValidation.authSchema, true),
    auth(categoryEndpoint.create),
    uploadFilecloud(fileValidation.image).single("image"),
    validation(categoryValidation.addCategorySchema),
    categoryControl.addCategory
  )

  .get("/", categoryControl.allCategories)

  .get(
    "/:categoryId",
    validation(categoryValidation.onecategorySchema),
    categoryControl.onecategory
  )

  .put(
    "/:categoryId",
    validation(categoryValidation.authSchema, true),
    auth(categoryEndpoint.update),
    uploadFilecloud(fileValidation.image).single("file"),
    validation(categoryValidation.updatecategorySchema),
    categoryControl.updatecategory
  );






export default router