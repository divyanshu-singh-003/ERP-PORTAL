import mongoose from "mongoose";

const Schema = mongoose.Schema;
const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    description: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    itemPicture:{ type: String, required: false },
    question: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    email: {
      type:String,
      required: true,
    },
    createdAt:{
        type:Number
    },
    updatedAt:{
        type:Number
    }
  },
  {
    timestamps: {
      currentTime: () => Date.now()
    },
  }
);

const PostItem = mongoose.model("PostItem", itemSchema);

export default PostItem;