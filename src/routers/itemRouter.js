import express from "express";
import multer from "multer";
import {
  addItem,
  updateItem,
  deleteItem,
  getAllItems,
  getItem,
} from "../controllers/itemController";
import { authManager } from "../controllers/userController";
import Image from "../models/Image";
import sharp from "sharp";

const router = express.Router();

// storate to mongodb (using memoryStorage)
const storage = multer.memoryStorage();

// 파일 업로드 처리에 사용되는 미들웨어를 만든다
const upload = multer({
  storage,
});

// "/items"
// get
router.get("/", getAllItems);
router.get("/:id", getItem);
// post
router.post(
  "/",
  authManager,
  upload.single("item_image"),
  async (req, res, next) => {
    const buffer = await sharp(req.file.buffer)
      .resize(200, 200)
      .png()
      .toBuffer();
    const image = new Image({
      image: {
        data: buffer,
        contentType: req.file.mimetype,
      },
    });
    await image.save();
    console.log("success to save image");
    // res.send("success");
    console.log(image._id);
    if (!image._id) {
      return res.status(400).send("이미지 저장에 실패했습니다.");
    }

    req.body.imageId = image._id;
    next();
  },
  addItem
);
// update
router.patch("/:id", authManager, updateItem);
// delete
router.delete("/:id", authManager, deleteItem);

export default router;
