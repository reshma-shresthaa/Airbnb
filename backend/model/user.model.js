import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    list:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"List"
    },
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"booking"
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User

