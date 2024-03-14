import Router from "express"
import uploadFilecloud, { fileValidation } from "../../utils/multer.js"
import * as brandControl from "./controller/brand.controller.js"
import brandEndpoint from "./brand.endpoint.js"
import validation from "../../middleware/validation.js"
import * as brandValidation from './brand.validation.js'
import auth from "../../middleware/auth.js"


const router = Router()

router.post('/',
    validation(brandValidation.authSchema, true),
    auth(brandEndpoint.create),
    uploadFilecloud(fileValidation.image).single('image'),
    validation(brandValidation.addBrandSchema),
    brandControl.addBrand)

    .get('/',
        brandControl.allBrands)
    
    .get('/:brandId',
        validation(brandValidation.oneBrandSchema),
        brandControl.oneBrand)
    
    .put('/:brandId',
        validation(brandValidation.authSchema, true),
        auth(brandEndpoint.update),
        uploadFilecloud(fileValidation.image).single('image'),
        validation(brandValidation.updateBrandSchema),
        brandControl.updateBrands)

export default router