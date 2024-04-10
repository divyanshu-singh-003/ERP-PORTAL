import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";

import { UploadItemController ,getProductController ,updateProductController} from "../controllers/uploadItem.controller.js";

const router=express.Router();

router.post("/postlfitem",UploadItemController);

router.get("/getlfitem",getProductController);

router.post("/updatelfitem",updateProductController);

export default router;


