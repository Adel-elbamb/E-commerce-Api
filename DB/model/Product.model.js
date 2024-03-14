import mongoose,{ Schema,model ,Types} from "mongoose";

const productSchema = new Schema ({
    name :{
        type : String ,
        required : [true , 'name must be required'],
        trim :true ,
        lowercase : true ,
        min:3,
        max:30

    },
    slug :{
        type : String ,
        required : [true , 'slug must be required'],
        trim : true ,
        lowercase : true 
    },
    description : String ,
    stock :{
        type: Number , 
        min :1,
        required : [true , 'stock must be required'],
    } ,
    price : {
type : Number,
min :1,
    required : [true , 'price must be required'],
    },
    discount : Number,
    totalPrice :{
        type : Number,
        required : [true , 'total price must be required'],
min:1
    },
    colors:[String],
    sizes:[String],
    mainImage :{
        type : Object,
        required : [true , 'image must be required']
    },
    subImage :{
        type : Object
    },
    isDeleted : {
        type : Boolean ,
        default : false 
    },
    createdBy :{
        type : Types.ObjectId,
        ref : 'User',
        required: [true , 'user must be required'] 
    },
    updatedBy :{
        type : Types.ObjectId,
        ref : 'User',
    },
    categoryId :{
        type : Types.ObjectId,
        ref : 'Category',
        required: [true , 'categoryId be required'] 
    },
    subcategoryId :{
        type : Types.ObjectId,
        ref : 'Subcategory',
        required: [true , 'subcategoryId must be required'] 
    },
    brandId :{
        type : Types.ObjectId,
        ref : 'Brand',
        required: [true , 'brandId must be required'] 
    },
    customId:{
        type:String,
        required:true
    }
})


const productModel = mongoose.model.Product || model('Product',productSchema)
export default productModel