import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import bcrypt from "bcryptjs";

export const login = async (req,res) =>{
    try {
		const { email, password } = req.body;
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
        const { fullName, email, password, confirmPassword, gender } = req.body;
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