import mongoose from "mongoose";
const cachSchema = new mongoose.Schema({

    uid:{
        required:[true,"uid is required"],
        type:String,
        
    },
    key:{
        type:String
    },
    value:{
        type:String,
   
    },
    ttl:{
        type:Date
    }
   
})

const cach = mongoose.model("cach",cachSchema)
export default cach