import User from "../models/user.model.js";
import Subject from "../models/subject.model.js";
import Marks from "../models/marks.model.js";
import Test from "../models/test.model.js";
import Attendance from "../models/attendance.model.js";

export const putAttendance = async(req,res) =>{
    try {
        const { userName, email, subjectCode,  totalAttendance } = req.body;
    
        const user = await User.findOne({ fullName: userName, email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        const subject = await Subject.findOne({ subjectCode });
        if (!subject) {
          return res.status(404).json({ error: "Subject not found" });
        }
        const att=await Attendance.findOne({student:user._id,subject:subject._id});
        if(att){
          return res.status(404).json({error:"Attendance already exists"});
        }
    

        const atten = new Attendance({
          student: user._id,
          subject: subject._id,
          totalAttendance,
  
        });
    

        await atten.save();
    
        res.status(201).json({ message: "Attendance added successfully", atten });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    export const getAttendance = async (req, res) => {
      try {
          const { userId } = req.query;
          
          const atten = await Attendance.find({ student: userId}).populate('subject');
  
          if (!atten || atten.length === 0) {
              return res.status(404).json({ error: "Attendance not found" });
          }
  
          res.status(200).json({ atten });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  

    






