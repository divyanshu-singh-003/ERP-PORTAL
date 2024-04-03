import Test from "../models/test.model.js";

export const putTest = async(req,res) => {
    const { test , totalMarks , date } = req.body;
    try {
        const { test, totalMarks, date } = req.body;
    
        
        const existingTest = await Test.findOne({ test });
        if (existingTest) {
          return res.status(400).json({ error: 'Test already exists' });
        }
    
        
        const newTest = new Test({ test, totalMarks, date });
    
       
        const savedTest = await newTest.save();
    
        res.status(201).json(savedTest);
      } catch (err) {
        console.log("Errors: ",error.message);
        const errors = { backendError: String };
        errors.backendError = error;
        res.status(500).json(errors);
      }
};

