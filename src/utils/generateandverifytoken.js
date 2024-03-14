import jwt from 'jsonwebtoken'

export const generateToken = ({payload ={},signature = process.env.TOKEN_SEGNATURE, expiresIn }={})=>{
    const token = jwt.sign(payload,signature,{expiresIn: parseInt(expiresIn)})
    return token

}

export const verifyToken = ({token ,signature = process.env.TOKEN_SEGNATURE }={})=>{
    const decoded = jwt.verify(token,signature)
    return decoded

}