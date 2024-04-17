import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { putMarks , getMarks ,getMarks2} from "../controllers/mark.controller.js";


const router=express.Router();

router.post("/putmarks",putMarks);

router.get("/getmarks",getMarks);

router.get("/getmarks2",getMarks2);

export default router;
