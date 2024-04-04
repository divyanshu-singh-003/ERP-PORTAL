import User from "../models/user.model.js";
import Subject from "../models/subject.model.js";
import Marks from "../models/marks.model.js";
import Test from "../models/test.model.js";
import Attendance from "../models/attendance.model.js";

export const putAttendance = async(req,res) =>{
    try {
        const { userName, email, subjectCode, test, totalAttendance , totalClasses } = req.body;
    
        const user = await User.findOne({ fullName: userName, email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        const subject = await Subject.findOne({ subjectCode });
        if (!subject) {
          return res.status(404).json({ error: "Subject not found" });
        }
    
        const testDoc = await Test.findOne({ test });
        if (!testDoc) {
          return res.status(404).json({ error: "Test not found" });
        }
    

        const atten = new Attendance({
          student: user._id,
          subject: subject._id,
          test: testDoc._id,
          totalAttendance,
          totalClasses
        });
    

        await atten.save();
    
        res.status(201).json({ message: "Attendance added successfully", atten });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
export const getAttendance = async (req, res) => {
    try {
        const { userId, testname } = req.query;

        const test = await Test.findOne({ test: testname });
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }

        const atten = await Attendance.find({ student: userId, test: test._id }).populate('subject');

        if (!atten || atten.length === 0) {
            return res.status(404).json({ error: "Attendance not found" });
        }

        res.status(200).json({ atten });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

    






