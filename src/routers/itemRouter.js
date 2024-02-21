import express from "express";
import multer from "multer";
import path from "path";
import {
  addItem,
  updateItem,
  deleteItem,
  getAllItems,
  getItem,
  getItemImage,
} from "../controllers/itemController";
import { authManager } from "../controllers/userController";

const router = express.Router();

// 이미지 제목 생성을 위한 함수
function generateCurrentTimestamp() {
  const currentDate = new Date();
  const timestamp = currentDate
    .toISOString()
    .replace(/[-T:]/g, "")
    .split(".")[0];
  return timestamp;
}

// 이미지 파일 저장 위치 및 파일 이름 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../resources/images");
  },
  filename: function (req, file, cb) {
    // console.log(file.originalname);
    // console.log(file.mimetype);
    // 이미지 파일의 이름을 product_name.기존확장자 로 설정한다. -> 한글이 깨짐
    // 이미지 파일의 이름을 현재시간을 기준으로 만든다.
    const currentTimestamp = generateCurrentTimestamp();
    const filename = currentTimestamp + path.extname(file.originalname);

    req.body.filename = filename;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("PNG, JPG/JPEG 파일만 업로드 가능합니다."));
    }
    cb(null, true);
  },
  // limits : {
  //   fileSize : 1024*1024
  // }
}); // 파일 업로드 처리에 사용되는 미들웨어를 만든다

// "/items"
// get
router.get("/", getAllItems);
router.get("/:id", getItem);
router.get("/image/:id", getItemImage);
// post
router.post("/", authManager, upload.single("item_image"), addItem);
// 여기에 사용된 item_image 라는 값이 request시에 이미지를 넣을 Key가 된다.
// update
router.patch("/:id", authManager, updateItem);
// delete
router.delete("/:id", authManager, deleteItem);

export default router;
