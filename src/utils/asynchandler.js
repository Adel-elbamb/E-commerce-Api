export const asyncHandler = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((error)=>{

return next(new Error (error,{cause:500}))
        })
    }
    }

export const globalError = (error,req,res,next)=>{
if (req.validationresult){
    return res.status(error.cause || 400).json({message: error.message , details : req.validationresult.details })
}
    if(process.env.MOOD == 'DEV'){  // not forget dev 
        // stack apper for me in work 
        return res.status(error.cause || 400).json({message: error.message , stack : error.stack })
    }
    return res.status(error.cause || 400).json({message: error.message})
    }

//400 --> bad request
// 400 Bad Request Server didn't understand the URL you gave it.
// 401 Unauthorized Must be authenticated
// 402 Payment Required Not used really
// 403 Forbidden Server refuses to give you a file, authentication won't help
// 404 Not Found


