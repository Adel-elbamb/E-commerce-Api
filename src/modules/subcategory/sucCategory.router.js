import {Router} from "express"
import uploadFilecloud, { fileValidation } from "../../utils/multer.js"
import * as SubCategoryschema from './subCategory.validation.js'
import * as subCategoryControl from './controller/subCategory.controller.js'
import validation from "../../middleware/validation.js"
import auth from "../../middleware/auth.js"
import subcategoryEndpoint from "./router.endpoint.js"

const router = Router({mergeParams : true})

router
  .post(
    "/",
    validation(SubCategoryschema.authSchema, true),
    auth(subcategoryEndpoint.create),
    uploadFilecloud(fileValidation.image).single("file"),
    validation(SubCategoryschema.addSubCategorySchema),
    subCategoryControl.addSubCategory
  )

  .get("/", subCategoryControl.allSubCategories)

  .get(
    "/:subCategoryId",
    validation(SubCategoryschema.oneSubCategorySchema),
    subCategoryControl.oneSubCategory
  )

  .put(
    "/:subCategoryId",
    validation(SubCategoryschema.authSchema, true),
    auth(subcategoryEndpoint.update),
    uploadFilecloud(fileValidation.image).single("file"),
    validation(SubCategoryschema.updateSubCategorySchema),
    subCategoryControl.updateSubCategory
  );


export default router