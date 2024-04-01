import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
// app.get("/",(req,res)=>{
//     res.send("Hello World");
// })

app.use("/api/auth",authRoutes);

app.listen(5000,()=>{
    console.log("Server is running at port 5000");
})