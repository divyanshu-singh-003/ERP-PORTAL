import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { putTest } from "../controllers/test.controller.js";
const router=express.Router();

router.post("/puttest",putTest);

export default router;