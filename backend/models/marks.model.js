import mongoose from "mongoose";
const { Schema } = mongoose;

const marksSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: "test",
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
  subject:{
    type:Schema.Types.ObjectId,
    ref:"subject"
  },

  t1: {
    type: Number,
    default: -1,
  },
  t2: {
    type: Number,
    default: -1,
  },
  endsem: {
    type: Number,
    default: -1,
  },
  
});
