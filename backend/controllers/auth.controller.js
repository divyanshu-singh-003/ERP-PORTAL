import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import bcrypt from "bcryptjs";

export const login = async (req,res) =>{
    try {
		const { name , email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const signup = async (req,res) =>{
    console.log("Connected to signup");
    try {
        const { fullName, email, password, confirmPassword, gender, year , department , fatherName , dob, section , motherName , contactNumber } = req.body;
        console.log(password);
        console.log(confirmPassword);
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        //HASH PASSWORD HERE

        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

        

        

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
            gender,
            year,
            department,
            fatherName,
            motherName,
            contactNumber,
            dob,
            section
            
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            
        });
        }
        else{
            res.status(400).json({error:"Invalid User data"});
        }
        
    } catch (error) {
        console.error("Error in signup ", error.message);
        res.status(500).json({ error: "Internal server Error" });
    }
}

export const logout = async (req,res) =>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const getAllStudents = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user based on the provided id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { department, section, batch } = user;

        // Constructing the query based on department, section, and batch
        const query = {
            department,
            section,
            batch
        };
        const users = await User.find(query);


        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getSingleStudent = async(req,res) =>{
    try{
        const { id } = req.params;
    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({error: 'User not found'});

    }
    res.status(200).json(user);
    }

    catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    

}


export const updateStudent = async (req, res) => {
    try {
      const {
        name,
        dob,
        department,
        contactNumber,
        avatar,
        email,
        batch,
        section,
        year,
        fatherName,
        motherName,
        fatherContactNumber,
      } = req.body;
      const updatedStudent = await User.findOne({ email });
      if (name) {
        updatedStudent.name = name;
        await updatedStudent.save();
      }
      if (dob) {
        updatedStudent.dob = dob;
        await updatedStudent.save();
      }
      if (department) {
        updatedStudent.department = department;
        await updatedStudent.save();
      }
      if (contactNumber) {
        updatedStudent.contactNumber = contactNumber;
        await updatedStudent.save();
      }
      if (batch) {
        updatedStudent.batch = batch;
        await updatedStudent.save();
      }
      if (section) {
        updatedStudent.section = section;
        await updatedStudent.save();
      }
      if (year) {
        updatedStudent.year = year;
        await updatedStudent.save();
      }
      if (motherName) {
        updatedStudent.motherName = motherName;
        await updatedStudent.save();
      }
      if (fatherName) {
        updatedStudent.fatherName = fatherName;
        await updatedStudent.save();
      }
      if (fatherContactNumber) {
        updatedStudent.fatherContactNumber = fatherContactNumber;
        await updatedStudent.save();
      }
      if (avatar) {
        updatedStudent.avatar = avatar;
        await updatedStudent.save();
      }
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json(error);
    }
  };

