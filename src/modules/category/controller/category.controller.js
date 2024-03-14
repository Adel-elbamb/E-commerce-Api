import slugify from "slugify"
import categoryModel from "../../../../DB/model/Category.model.js"
import cloudinary from "../../../utils/cloudinary.js"
import {asyncHandler} from "../../../utils/asynchandler.js"



//========================================addCatogery ============================================
//1-check name exist or not 
//2- upload image 
//3- make slug of name  
//3- add category
export const addCategory = asyncHandler(async(req,res,next)=>{
    //1
    const {name} = req.body

    if (await categoryModel.findOne({name})){
        return next(new Error('name must be unique',{cause: 409})) //conflict
    }
    //2
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder : `${process.env.APP_NAME}/category`})
    if(!public_id){
        return next(new Error('image not uploaded',{cause: 400}))
    }
    req.body.image = {public_id,secure_url}
    //3
    req.body.slug = slugify(name)
    req.body.createdBy = req.user._id
    //4
    const create = await categoryModel.create(req.body)
    return res.status(201).json({message:"done",category : create}) 

})
//=================================get all catogery ==================================
export const allCategories =asyncHandler(async(req,res,next)=>{ 
    const allCategories = await categoryModel.find({}).populate({
        path : 'subCategory'
    })
    return res.status(200).json({message:"done",allCategories}) 
})
//==================================get one catogery=====================

export const onecategory = asyncHandler(async(req,res,next)=>{
const onecategory = await categoryModel.findById({_id : req.params.categoryId}).populate({
    path : 'subCategory'
})
return res.status(200).json({message:"done",onecategory}) 

})

///======================================update Catogery===================
//1-check id 
//2-check name exist or not --> change slug
//3- upload image --> add new photo --> delete old image
//4- update category
export const updatecategory = asyncHandler(async(req,res,next)=>{
    const {categoryId} = req.params
    const id_exist = await categoryModel.findById({_id : categoryId})
    if (! id_exist) {
        return next(new Error('category not found',{cause: 404}))
    }
    if(req.body.name){
        const name_exist = await categoryModel.findOne({name: req.body.name})
        if(name_exist){
            return next(new Error('name must be unique',{cause: 409}))
        }
        req.body.slug = slugify(req.body.name)
    }
    if(req.file){
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder : `${process.env.APP_NAME}/category`})
    if(!public_id){
        return next(new Error('image not uploaded',{cause: 400}))
    }
    req.body.image = {public_id,secure_url}
    await cloudinary.uploader.destroy(id_exist.image.public_id)
    }
    req.body.updatedBy = req.user._id
   const updated = await categoryModel.findOneAndUpdate({_id : categoryId},req.body,{new : true})

   return res.status(200).json({message:"updated sucessfully",updated}) 

})