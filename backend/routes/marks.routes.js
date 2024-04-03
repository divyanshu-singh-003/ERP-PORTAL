import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { putMarks , getMarks } from "../controllers/mark.controller.js";


const router=express.Router();

router.post("/putmarks",putMarks);

router.get("/getmarks",getMarks);

export default router;
