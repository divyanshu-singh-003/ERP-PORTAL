import User from "../models/user.model.js";
import Subject from "../models/subject.model.js";



export const putSubjects = async(req,res) => {
    try{
        const { totalLectures, department, subjectCode, subjectName, year } =
      req.body;

      const errors = {subjectError: String};

      const subject = await Subject.findOne({ subjectCode });

      if(subject){
        errors.subjectError = "Given subject is already added";
        return res.status(400).json(errors);
      }
      const newSubject = await new Subject({
      totalLectures,
      department,
      subjectCode,
      subjectName,
      year,
      });
      await newSubject.save();

    const students = await User.find({ department, year });
    if (students.length !== 0) {
      for (var i = 0; i < students.length; i++) {
        students[i].subjects.push(newSubject._id);
        await students[i].save();
      }
    }

      return res.status(200).json({
        success: true,
        message: "Subject added successfully",
        response: newSubject,
    });


    }
    catch (error) {
      console.log("Errors: ",error.message);
        const errors = { backendError: String };
        errors.backendError = error;
        res.status(500).json(errors);
    }
};

export const  getSubjects = async(req,res) => {
  try{
    const { id } =req.params;
    const student = await User.findById(id).populate("subjects");


    if(!student){
      return res.status(404).json({ message: 'Student not found' });
    }

    const subjects=student.subjects;
    res.status(200).json(subjects);

  }
  catch(error){
    console.log("Errors: ",error.message);
        const errors = { backendError: String };
        errors.backendError = error;
        res.status(500).json(errors);
  }
};


