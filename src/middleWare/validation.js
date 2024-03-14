
const validation =(schema,containHeaders = false)=>{
    return (req,res,next)=>{
try {
    let methods = {...req.body , ...req.params , ...req.query}
    if(req.file){
        methods.file = req.file
    }
    if(req.files){
        methods.files = req.files
    }
    if(req.headers.auth && containHeaders){
        methods = {auth : req.headers.auth}
    }
    const validationresult = schema.validate(methods,{abortEarly : false})
if(validationresult.error){
req.validationresult = validationresult.error 
return next(new Error('validation error',{cause : 400}))
}
next()

} catch (error) {
    return res.json({message: error.message , stack : error.stack})

}
}
}


export default validation



// const validation = (schema)=>{
// return (req,res,next)=>{
//  try {
//     let methods 
//     if (req.headers.auth){
//         methods = {...req.body , ...req.params , ...req.query,auth :req.headers.auth}
//     }else {
//         methods = {...req.body , ...req.params , ...req.query}
//     }
//     if(req.file){
//         methods = {...methods, file: req.file}
//     }
//     if(req.files){
//         methods = {...methods, files: req.files}
//     }
//     const validation = schema.validate(methods,{abortEarly:false}) 
//     if(validation?.error){
//        // return res.status(403).json({message:"done",result : validation.error.details})
//        req.validationresult =  validation.error.details
//         return next (new Error ('validation error',{cause : 403}))
//     }
//    return next()
// }
//  catch (error) {
//     return res.json({message: error.message , stack : error.stack})
//     }
// }}
// export default validation 
// //403 -->  Forbidden error