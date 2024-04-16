import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

import subjectRoutes from "./routes/subject.routes.js";
import testRoutes from "./routes/test.routes.js";
import markRoutes from "./routes/marks.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import lfRoutes from "./routes/item.routes.js";
import cabRoutes from "./routes/cab.routes.js";







import connectToMongo from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();


app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/auth",authRoutes);
app.use("/api/sub",subjectRoutes);
app.use("/api/test",testRoutes);
app.use("/api/mark",markRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/lfitem",lfRoutes);
app.use("/api/cabs",cabRoutes);







app.listen(5000,()=>{
    connectToMongo();
    console.log("Server is running at port 5000");
})