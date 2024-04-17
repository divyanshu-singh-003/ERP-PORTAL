import express, { Router } from "express";


import { getStudentsAdmin , putMarksAdmin} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/adminstudents",getStudentsAdmin);
router.post("/adminmarks",putMarksAdmin);


export default router;