import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: { 
            type: String, 
            required: true, 
            unique: true,
            validate: {
              validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
              },
              message: props => `${props.value} is not a valid email address!`
            }
          },
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
        year: {
            type: Number,
            required: true,
        },
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		fatherName: {
			type: String,
		},
		motherName: {
			type: String,
		},
		department: {
			type: String,
			required: true,
		  },
		  section: {
			type: String,
			required: true,
		  },
		  batch: {
			type: String,
		  },
		  contactNumber: {
			type: Number,
		  },
		  fatherContactNumber: {
			type: Number,
		  },
		  dob: {
			type: String,
			required: true,
		  },
		  subjects: [
			{
			  type: Schema.Types.ObjectId,
			  ref: "Subject",
			},
		  ],
		


		// createdAt, updatedAt => Member since <createdAt>
	},
	// { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;