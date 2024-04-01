import mongoose from "mongoose";

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
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		// createdAt, updatedAt => Member since <createdAt>
	},
	// { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;