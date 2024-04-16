import express from "express";

import { putCab , getCabs} from "../controllers/cabs.controller.js";
const router=express.Router();

router.post("/putcab",putCab);

router.get("/getcab", getCabs);



export default router;