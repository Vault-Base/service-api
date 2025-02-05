import mongoose from "mongoose";
const storageSchema = new mongoose.Schema({

    uid:{
        required:[true,"Email is required"],
        type:String,

    },
    imagelink:{
        type:String
    },
    key:{
        type:String,
        unique:true,
    }
   
})

const storage = mongoose.model("storage",storageSchema)
export default storage