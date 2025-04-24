import mongoose from "mongoose";
const { Schema } = mongoose;

const attendanceSchema = new Schema({
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
  totalAttendance: {
    type: Number,
    required: true,
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
