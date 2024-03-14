import cloudinary from '../../../utils/cloudinary.js'
import couponModel from "../../../../DB/model/Coupon.model.js";
import { asyncHandler } from "../../../utils/asynchandler.js";

//============================= create Coupon ===============================
export const createCoupon = asyncHandler(
    async(req,res,next)=>{
const {name} = req.body 
if (await couponModel.findOne({name})){
    return next(new Error('name already exist'),{cause:409})
}
if(req.file){

    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder : `${process.env.APP_NAME}/coupon`})
    if(!public_id){
        return next(new Error('image not uploaded',{cause: 400}))
    }
    req.body.image = {public_id,secure_url}
    }
    req.body.createdBy = req.user._id
const coupon = await couponModel.create(req.body)
res.status(201).json({message:"coupon created successfully",coupon})
    }
)
 //==============================allCoupons ==============================
export const allCoupons = asyncHandler(async(req,res,next)=>{ 
    const allCoupons = await couponModel.find({})
    return res.status(200).json({message:"done",allCoupons}) 
})
//=================================one coupon ===================================
export const oneCoupon = asyncHandler(async(req,res,next)=>{
    const oneCoupon = await couponModel.findById({ _id: req.params.couponId })
    if (!oneCoupon) {
                return next(new Error("coupon not found", { cause: 404 }));
    }
    return res.status(200).json({message:"done",oneCoupon}) 
    })

export const updateCoupon = asyncHandler(async(req,res,next)=>{
    const {couponId} = req.params
    const couponExist = await couponModel.findById({_id : couponId})
    if (! couponExist) {
        return next(new Error('coupon not found',{cause: 404}))
        }
    if(req.body.name){
        const name_exist = await couponModel.findOne({name: req.body.name})
        if(name_exist){
            return next(new Error('name must be unique',{cause: 409}))
        }}
    if(req.file){
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder : `${process.env.APP_NAME}/coupon`})
      if(!public_id){
        return next(new Error('image not uploaded',{cause: 400}))
    }
    req.body.image = {public_id,secure_url}
    if(couponExist.image?.public_id){
    await cloudinary.uploader.destroy(couponExist.image.public_id)
    }
    }
    req.body.updatedBy = req.user._id
    const updated = await couponModel.findOneAndUpdate({_id : couponId},req.body,{new : true})
    
    return res.status(200).json({message:"updated sucessfully",updated}) 
    
    })