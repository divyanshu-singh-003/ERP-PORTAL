import User from "../models/user.model.js";
import Marks from "../models/marks.model.js";
import Test from "../models/test.model.js";
import Subject from "../models/subject.model.js";
import Attendance from "../models/attendance.model.js"


export const getStudentsAdmin = async(req,res) =>{
    try{
        const { year , section , department } = req.query;

        const users =await  User.find({year , section , department});

        res.json({
            message:"Students fetched successfully",
            success:true,
            error:false,
            data:users
        })
    }
    catch(e){
        res.status(400).json({
            message:e.message || e,
            error:true,
            success:false
        })
    }
}


export const putMarksAdmin = async(req,res) =>{
    try{
        const {fullName , email , subjectCode , test , marks} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User not found",
                error:true,
                success:false
            })
        }
    
        const subject1 = await Subject.findOne({subjectCode});
        if(!subject1){
            return res.status(400).json({
                message:"Subject not found",
                error:true,
                success:false
            })
        }
        const testDoc = await Test.findOne({ test });
        let markDoc = await Marks.findOne({ student: user._id, subject: subject1._id, test: testDoc._id });

      if (markDoc) {
         markDoc.totalMarks = marks;
      } else {
      markDoc = new Marks({
        student: user._id,
        subject: subject1._id,
        test: testDoc._id,
        totalMarks: marks
      });
    }

    await markDoc.save();

    res.json({
      message: "Student marked successfully",
      success: true,
      error: false,
      data: markDoc
    });

    }
    catch(e){
        res.status(400).json({
            message:e.message || e,
            error:true,
            success:false
        })
    }
   

}


export const putAdminAttendance = async(req,res) =>{
    try {
        const { userName, email, subjectCode,  totalAttendance , totalClasses } = req.body;
    
        const user = await User.findOne({ fullName: userName, email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        const subject = await Subject.findOne({ subjectCode });
        if (!subject) {
          return res.status(404).json({ error: "Subject not found" });
        }
        subject.totalLectures=totalClasses;
        await subject.save();
        let att=await Attendance.findOne({student:user._id,subject:subject._id});
        if(att){
        att.totalAttendance = totalAttendance;
        await att.save();
        }
    else{
        att = new Attendance({
            student: user._id,
            subject: subject._id,
            totalAttendance,
    
          });
          await att.save();
    }

    
    res.json({
        message: "Attendance marked successfully",
        success: true,
        error: false,
        data: att
      });
      } catch (e) {
        console.log(e.message);
        res.status(400).json({
            message:e.message || e,
            error:true,
            success:false
        })
      }
    };