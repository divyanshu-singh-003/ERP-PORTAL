import mongoose from "mongoose";
const { Schema } = mongoose;

const LostAndFound =new Schema({
    img:{
        type:String,
        default: "",
    },
    details:{
        type:String,
        default:""
    },
    email: {
        type:String
    }
})