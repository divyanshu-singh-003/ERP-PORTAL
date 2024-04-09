import express from "express";

import { postLostItem } from "../controllers/lostandfound.controller.js";

import multer from "multer";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "C:/Users/divya/OneDrive/Desktop/ERP/backend/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + "-" + Date.now());
    },
  });

  var upload = multer({ storage });
const router = express.Router();

router.post("/postlostandfound",upload.single("itemPictures"),postLostItem);

export default router;

