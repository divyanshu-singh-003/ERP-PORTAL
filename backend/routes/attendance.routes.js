import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { putAttendance , getAttendance } from "../controllers/attendance.controller.js";


const router=express.Router();

router.post("/putattendance",putAttendance);

router.get("/getattendance",getAttendance);

export default router;