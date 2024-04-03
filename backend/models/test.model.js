import mongoose from "mongoose";
const { Schema } = mongoose;


const testSchema = new Schema({
    test: {
        type: String,
        required: true,
        trim: true,
      },
      totalMarks: {
        type: Number,
        default: 10,
      },
      date: {
        type: String,
        required: true,
      },

});

const Test = mongoose.model("Test",testSchema);

export default Test;