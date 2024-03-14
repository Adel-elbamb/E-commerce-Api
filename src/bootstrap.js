import connection from '../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import categoryRouter from './modules/category/category.router.js'
import subCategoryRouter from './modules/subcategory/sucCategory.router.js'
import couponRouter from './modules/coupon/coupon.router.js'
import brandRouter from './modules/brand/brand.router.js'
import productRouter from './modules/product/product.router.js'
import cartRouter from "./modules/cart/cart.router.js";
import orderRouter from "./modules/order/order.router.js";
import userRouter from "./modules/user/user.router.js";
import { globalError } from './utils/asynchandler.js'
const bootstrap = (app, express) => {
    app.use((req,res,next) => {
        if (req.originalUrl == '/order/webhook') {
         return   next();

        } else {
         express.json()(req, res, next); 

        }
})
//setup API routing
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/category',categoryRouter)
app.use('/subCategory',subCategoryRouter)
app.use('/coupon',couponRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/brand',brandRouter)

app.all('*',(req,res,next)=>{
res.send("in_valid routing please check url or method")
})
app.use(globalError)
connection()
}

export default bootstrap