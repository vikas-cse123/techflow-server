import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[255,"A category must not exceed 255 charcaters"]
    }

})


const Category = mongoose.model("Category",categorySchema)
export default Category