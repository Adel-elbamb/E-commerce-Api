import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve('./config/.env')})
import cloudinary from 'cloudinary'

cloudinary.v2.config({
    api_key :process.env.API_KEY ,
    api_secret:process.env.API_SECRET,
    cloud_name :process.env.CLOUD_NAME,
    secure : true 
})

export default cloudinary.v2