import User from "../models/user.model.js";
import Subject from "../models/subject.model.js";
import Marks from "../models/marks.model.js";
import Test from "../models/test.model.js";



export const putMarks = async(req,res) =>{
    try {
        const { userName, email, subjectCode, test, score } = req.body;
    
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

    

        const marks = new Marks({
          student: user._id,
          subject: subject._id,
          test: testDoc._id,
          totalMarks: score,
        });
    

        await marks.save();
    
        res.status(201).json({ message: "Marks added successfully", marks });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
export const getMarks = async (req, res) => {
    try {
        const { userId, testname } = req.query;

        const test = await Test.findOne({ test: testname });
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }

        const marks = await Marks.find({ student: userId, test: test._id }).populate('subject');

        if ( marks.length === 0) {
            return res.status(404).json({ marks });
        }

        res.status(200).json({ marks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getMarks2 = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId).populate("subjects");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const tests = ["T1", "T2", "EndSem"];

    const marks = await Marks.find({ student: userId }).populate("test").populate("subject");

    const marksData = {};

    user.subjects.forEach((subject) => {
      marksData[subject.subjectCode] = {
        subjectName: subject.subjectName, 
      };

      tests.forEach((test) => {
        marksData[subject.subjectCode][test] = "-";
      });
    });

    marks.forEach((mark) => {
      const subjectCode = mark.subject.subjectCode; 
      const subjectName = mark.subject.subjectName;
      const test = mark.test?.test; 
      if (marksData[subjectCode] && test) {
        marksData[subjectCode][test] = mark.totalMarks;
      }
    });

    user.subjects.forEach((subject) => {
      let totalMarksObtained = 0;
      let totalMarksAvailable = 0;

      tests.forEach((test) => {
        const marks = marksData[subject.subjectCode][test];
        if (marks !== "-") {
          totalMarksObtained += parseInt(marks);
          if (test === "T1" || test === "T2") {
            totalMarksAvailable += 20; 
          } else if (test === "EndSem") {
            totalMarksAvailable += 60; 
          }
        }
      });

      const percentage = (totalMarksObtained / totalMarksAvailable) * 100 || 0;

      marksData[subject.subjectCode]["TotalMarksObtained"] = totalMarksObtained;
      marksData[subject.subjectCode]["TotalMarksAvailable"] = totalMarksAvailable;
      marksData[subject.subjectCode]["Percentage"] = percentage.toFixed(2);
    });

    res.status(200).json({ marks: marksData });
  } catch (error) {
    res.status(400).json({
      message: e.message || e,
      error: true,
      success: false
    })
  }
};
