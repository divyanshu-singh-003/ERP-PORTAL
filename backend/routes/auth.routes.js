import express from "express";
import {getAllStudents, login,logout,signup} from "../controllers/auth.controller.js"
const router=express.Router();

router.post("/login",login);

router.post("/logout",logout);

router.post("/signup",signup);

router.get("/allstudents/:id",getAllStudents);


export default router;