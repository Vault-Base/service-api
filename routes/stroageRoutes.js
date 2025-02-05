import express from "express";
import { getImage, sendImage } from "../controllers/storageController.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { protect } from "../middlewares/middleware.js";

// const authRouter = express.Router();
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { uid } = req.body;
    console.log(req.body)
    if (!uid) {
      return cb(new Error("uid is required"), false);
    }

    const userFolder = path.join(__dirname,"..", "public", "uploads",uid);

    fs.mkdir(userFolder, { recursive: true }, (err) => {
      if (err) return cb(err, false);
      cb(null, userFolder);
    });
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
;
router.post("/upload-file", protect,upload.single("file"),sendImage);
router.get('/get-file',protect,getImage);
export default router