import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { putAttendance , getAttendance , getUserAttendanceSummary } from "../controllers/attendance.controller.js";



const router=express.Router();

router.post("/putattendance",putAttendance);

router.get("/getattendance",getAttendance);

router.get("/userattendance",getUserAttendanceSummary);

export default router;