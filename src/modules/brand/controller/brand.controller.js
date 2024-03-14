import slugify from "slugify"
import brandModel from "../../../../DB/model/Brand.model.js"
import cloudinary from "../../../utils/cloudinary.js"
import {asyncHandler} from "../../../utils/asynchandler.js"
import categoryModel from "../../../../DB/model/Category.model.js"
///==========================================================================================

export const addBrand = asyncHandler(async(req,res,next)=>{
    //1
    const {name} = req.body

    if (await brandModel.findOne({name})){
        return next(new Error('name must be unique',{cause: 409})) //conflict
    }
    //2
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder : `${process.env.APP_NAME}/brand`})
    if(!public_id){
        return next(new Error('image not uploaded',{cause: 400}))
    }
    req.body.image = {public_id,secure_url}
    //3
    req.body.slug = slugify(name)
    req.body.createdBy = req.user._id
    //4
    const create = await brandModel.create(req.body)
    return res.status(201).json({message:"done",brand : create}) 

})
//get all brands
export const allBrands =asyncHandler(async(req,res,next)=>{ 
    const allBrands = await brandModel.find({})
    return res.status(200).json({message:"done",allBrands}) 
})
//get one brand
export const oneBrand = asyncHandler(async(req,res,next)=>{
    const oneBrand = await brandModel.findById({ _id: req.params.brandId })
    if (!oneBrand) {
                return next(new Error("brand not found", { cause: 404 }));
    }
return res.status(200).json({message:"done",oneBrand}) 
})
//update brand 
export const updateBrands = asyncHandler(async(req,res,next)=>{
    const {brandId} = req.params
    const id_exist = await brandModel.findById({_id : brandId})
    if (! id_exist) {
        return next(new Error('brand not found',{cause: 404}))
    }
    if(req.body.name){
        const name_exist = await brandModel.findOne({name: req.body.name})
        if(name_exist){
            return next(new Error('name must be unique',{cause: 409}))
        }
        req.body.slug = slugify(req.body.name)
    }
    if(req.file){
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder : `${process.env.APP_NAME}/brand`})
    if(!public_id){
        return next(new Error('image not uploaded',{cause: 400}))
    }
    req.body.image = {public_id,secure_url}
    await cloudinary.uploader.destroy(id_exist.image.public_id)
    }
    req.body.updatedBy = req.user._id
   const updated = await brandModel.findOneAndUpdate({_id : brandId},req.body,{new : true})

   return res.status(200).json({message:"updated sucessfully",updated}) 

})