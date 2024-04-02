import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

import subjectRoutes from "./routes/subject.routes.js";
import connectToMongo from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();


app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/auth",authRoutes);
app.use("/api/sub",subjectRoutes);


app.listen(5000,()=>{
    connectToMongo();
    console.log("Server is running at port 5000");
})