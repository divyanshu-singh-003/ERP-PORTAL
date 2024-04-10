import mongoose from "mongoose";
const { Schema } = mongoose;


const itemSchema = new mongoose.Schema(
	{
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
        image:[],

		// createdAt, updatedAt => Member since <createdAt>
	},
	// { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;