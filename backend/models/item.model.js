import mongoose from "mongoose";
const { Schema } = mongoose;


const itemSchema = new mongoose.Schema(
	{

        fullName:{
            type:String,
            
        },
		name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        question:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        foundBy:{
            type:String,
            default:"None"
        },
        emailBy:{
            type:String,
            default:"None"
        },
        answer:{
            type:String,
            default:"",
        },
        image:[],

		// createdAt, updatedAt => Member since <createdAt>
	},
	// { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;