import jwt from 'jsonwebtoken'
import userModel from '../../DB/model/User.model.js'


const auth = (role)=>{
   return async(req,res,next)=>{
        const {auth} = req.headers
         if(!auth?.startsWith(process.env.BEARERtOKEN)){
            return next(new Error ('invalid bearer token'),{cause:400})
         }
         const token = auth.split(process.env.BEARERtOKEN)[1]
        if(!token){
            return next(new Error ('invalid token'),{cause:400})
        }
        const payload = jwt.verify(token,process.env.TOKEN_SEGNATURE)
        if(!payload?._id){
            return next(new Error ('invalid payload'),{cause:400})
        }
        const user = await userModel.findOne({_id:payload._id}).select('userName email status role')
        if(!user){
            return next(new Error ('not register account'),{cause:404})
        }
        if(user.status == 'Offline'){
            return next(new Error ('please login'),{cause:404})
        }
        if(!role.includes(user.role)){
            return next(new Error ('do not have access'),{cause:401})
        }
        req.user = user
        next()
        }
}
export default auth 

