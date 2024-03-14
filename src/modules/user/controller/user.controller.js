import productModel from "../../../../DB/model/Product.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/asynchandler.js";

//check is deleted in every end point
export const addTowishlist = asyncHandler(async (req, res, next) => {
    const { productId } = req.params
    const product = await productModel.findOne({ _id: productId , isDeleted : false })
    if (!product || product.isDeleted =="true") {
          return next(new Error("product not found"), { cause: 404 });
    }
    const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { $addToSet: { wishList: product._id } }, { new: true })
        .select('userName email status wishList')
        .populate([{
        path :'wishList'
    }])
    return res.json({message:"done",user})
});


export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productModel.findOne({
    _id: productId,
    isDeleted: false,
  });
  if (!product || product.isDeleted == "true") {
    return next(new Error("product not found"), { cause: 404 });
  }
  const user = await userModel
    .findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { wishList: product._id } },
      { new: true }
    )
    .select("userName email status wishList")
    .populate([
      {
        path: "wishList",
      },
    ]);
  return res.json({ message: "done", user });
});

// get one user is acouent when you is oner 
export const userAccountData = asyncHandler(async (req, res, next) => {
  //get data from req
  const { userId } = req.params;
  //check user exist
  const user = await userModel.findById({ _id: userId });
  if (!user) {
    return next(new Error("user not found", { cause: 404 }));
  }
  //check if you're the owner
  if (userId != req.user._id) {
    return next(new Error("you are not the owner of account", { cause: 400 }));
  }
  return res.json({ message: "done", user });
});
