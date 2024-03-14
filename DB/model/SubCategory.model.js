import mongoose,{ Schema,model ,Types} from "mongoose";

const SubCategorySchema = new Schema ({
    name :{
        type : String ,
        required : [true , 'name must be required'],
        unique : [true , 'name must be unique' ],
        trim :true ,
        lowercase : true 

    },
    slug :{
        type : String ,
        required : [true , 'slug must be required'],
        unique : [true , 'slug must be unique' ],
        trim : true ,
        lowercase : true 

    },
    image :{
        type : Object,
        required : [true , 'image must be required']
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
    categoryId:{
        type : Types.ObjectId,
        ref : 'Category',
        required: [true , 'categoryId must be required']
    }
},{
    timestamps :true
})

const SubCategoryModel = mongoose.model.SubCategory || model('SubCategory',SubCategorySchema)
export default SubCategoryModel