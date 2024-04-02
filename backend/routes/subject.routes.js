import express from "express";
import { putSubjects ,getSubjects} from "../controllers/subject.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router=express.Router();

router.post("/subject",putSubjects);

router.get("/getsubject/:id",protectRoute,getSubjects);


export default router;