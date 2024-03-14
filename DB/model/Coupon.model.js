import mongoose,{ Schema,model ,Types} from "mongoose";

const couponSchema = new Schema ({
    name :{
        type : String ,
        required : [true , 'name must be required'],
        unique : [true , 'name must be unique' ],
        trim :true 
    },
    amount:{
        type:Number,
        required : [true , 'amount must be required']
    },
    image :{
        type : Object
    },
    isDeleted : {
        type : Boolean ,
        default : false 
    },
    createdBy :{
        type : Types.ObjectId,
        ref : 'User',
        required: [true , 'user must be required'] //change to true
    },
    updatedBy :{
        type : Types.ObjectId,
        ref : 'User',
    },
    expireIn :{
        type: Date,
        required:true
    },
    usedBy :[{
        type : Types.ObjectId,
        ref : 'User'
    }]
},{
    timestamps :true
})

const couponModel = mongoose.model.Coupon || model('Coupon',couponSchema)
export default couponModel