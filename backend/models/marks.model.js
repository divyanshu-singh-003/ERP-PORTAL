import mongoose from "mongoose";
const { Schema } = mongoose;

const marksSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject", 
    required: true,
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test", 
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
});

const Marks = mongoose.model("Marks", marksSchema);

export default Marks;
