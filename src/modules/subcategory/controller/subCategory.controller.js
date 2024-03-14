import slugify from "slugify"
import SubCategoryModel from "../../../../DB/model/SubCategory.model.js"
import cloudinary from "../../../utils/cloudinary.js"
import {asyncHandler} from "../../../utils/asynchandler.js"
import categoryModel from "../../../../DB/model/Category.model.js"


//===================================addSubcategory ==================================
//1-check category exist or not
//2-check name exist or not 
//3- upload image 
//4- make slug of name  
//5- add subcategory
export const addSubCategory = asyncHandler(async(req,res,next)=>{
    //1
    const {categoryId} = req.params
    if (! await categoryModel.findById({_id:categoryId})){
        return next(new Error('category not found',{cause: 404})) 
    }
    //2
    const {name} = req.body
    if (await SubCategoryModel.findOne( {name})){
        return next(new Error('subcategory must be unique',{cause: 409})) 
    }
    //3
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder : `${process.env.APP_NAME}/category/${categoryId}/subCategory`})
    if(!public_id){
        return next(new Error('image not uploaded',{cause: 400}))
    }
    req.body.image = {public_id,secure_url}
    req.body.slug = slugify(name)
    req.body.categoryId = categoryId
    req.body.createdBy = req.user._id
    //4
    const create = await SubCategoryModel.create(req.body)
    return res.status(201).json({message:"done", subCategory : create}) 

})
//===============================================get all Subcatogery ===========================
//get all SubCategories
export const allSubCategories = asyncHandler(async (req, res, next) => { 
     const { categoryId } = req.params;
     if (!(await categoryModel.findById({ _id: categoryId }))) {
       return next(new Error("category not found", { cause: 404 }));
     }
    const allSubCategories = await SubCategoryModel.find({categoryId}).populate({
        path : 'categoryId'
    })
    return res.status(200).json({message:"done",allSubCategories}) 
})

//get one subCategory
export const oneSubCategory = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    if (!(await categoryModel.findById({ _id: categoryId }))) {
      return next(new Error("category not found", { cause: 404 }));
    }
const oneSubCategory = await SubCategoryModel.findById({_id : req.params.subCategoryId}).populate({
    path : 'categoryId'
})
    if (!oneSubCategory) {
              return next(new Error("subcategory not found", { cause: 404 }));
    }
return res.status(200).json({message:"done",oneSubCategory}) 
})
///=========================================update Subcategory ==================================   
//check subcategory exist or not 
//1-check id 
//2-check name exist or not --> change slug
//3- upload image --> add new photo --> delete old image
//4- update category
export const updateSubCategory = asyncHandler(async (req, res, next) => {
      const { categoryId } = req.params;
      if (!(await categoryModel.findById({ _id: categoryId }))) {
        return next(new Error("category not found", { cause: 404 }));
      }
    const {subCategoryId} = req.params
    const subCategory_exist = await SubCategoryModel.findById({_id : subCategoryId})
    if (! subCategory_exist) {
        return next(new Error('subCategory not found',{cause: 404}))
    }
    if(req.body.name){
        const name_exist = await SubCategoryModel.findOne({name: req.body.name})
        if(name_exist){
            return next(new Error('name must be unique',{cause: 409}))
        }
        req.body.slug = slugify(req.body.name)
    }
    if(req.file){
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder : `${process.env.APP_NAME}/category/${req.params.categoryId}/subCategory`})
    if(!public_id){
        return next(new Error('image not uploaded',{cause: 400}))
    }
    req.body.image = {public_id,secure_url}
    await cloudinary.uploader.destroy(subCategory_exist.image.public_id)
    }
    req.body.updatedBy = req.user._id
   const updated = await SubCategoryModel.findOneAndUpdate({_id : subCategoryId},req.body,{new : true})

   return res.status(200).json({message:"subCategory updated sucessfully", subategory : updated}) 

})
