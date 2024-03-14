import mongoose,{ Schema,model ,Types} from "mongoose";

const categorySchema = new Schema ({
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
        required: [true , 'user must be required'] 
    },
    updatedBy :{
        type : Types.ObjectId,
        ref : 'User',
    },
},{
    timestamps :true,
    toJSON :{virtuals:true},
    toObject :{virtuals : true}
})

categorySchema.virtual('subCategory', {
    ref: 'SubCategory',
    localField: '_id',
    foreignField: 'categoryId'
  });

const categoryModel = mongoose.model.Category || model('Category',categorySchema)
export default categoryModel