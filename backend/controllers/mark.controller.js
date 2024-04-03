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

        if (!marks || marks.length === 0) {
            return res.status(404).json({ error: "Marks not found" });
        }

        res.status(200).json({ marks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

    




