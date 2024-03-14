import mongoose from 'mongoose'

const connection = async()=>{
    return await mongoose
      .connect(process.env.URI)
      .then(() => {
        console.log("connected to db.....");
      })
      .catch(() => {
        console.log("not connected to db.....");
      });
}

export default connection

