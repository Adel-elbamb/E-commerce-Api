import mongoose,{ Schema,model ,Types} from "mongoose";

const brandSchema = new Schema ({
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
        required: [false , 'user must be required'] //change to true
    }
})

//mongoose.model.Brand ||
const brandModel = mongoose.model.Brand || model('Brand',brandSchema)
export default brandModel