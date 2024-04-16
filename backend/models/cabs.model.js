import mongoose from "mongoose";
const { Schema } = mongoose;


const cabSchema = new mongoose.Schema(
	{

        stuid:{
            type: String,
        },
		email:{
            type:String,
        },
        train:{
            type:String,
        },
        date:{
            type:String,
        },
        hour:{
            type:Number,
        },
        minute:{
            type:Number,
        },
        destination:{
            type:String,
        },
        phoneNumber:{
            type:String,
        }
        
		// createdAt, updatedAt => Member since <createdAt>
	},
	// { timestamps: true }
);

const Cab = mongoose.model("Cab", cabSchema);

export default Cab;