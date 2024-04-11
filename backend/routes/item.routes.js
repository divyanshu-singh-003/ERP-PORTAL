import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";

import { UploadItemController ,getProductController ,updateProductController ,getCategoryItem ,getCategoryWiseItem , getItemDetailsById ,updateFoundItem} from "../controllers/uploadItem.controller.js";

const router=express.Router();

router.post("/postlfitem",UploadItemController);

router.get("/getlfitem",getProductController);

router.post("/updatelfitem",updateProductController);

router.get("/getcategorylf",getCategoryItem);


router.get("/getcategoryitem",getCategoryWiseItem);

router.get("/getitem",getItemDetailsById);


router.post("/updatefound",updateFoundItem);

export default router;


