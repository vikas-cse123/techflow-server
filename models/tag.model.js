import mongoose from "mongoose";
const tagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[255,"A tag must not exceeed 255 characters."]
    }
})

const Tag = mongoose.model("Tag",tagSchema)
export default Tag