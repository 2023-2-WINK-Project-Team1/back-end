import express from "express";
import {
  getUserByToken,
  getUserNotifications,
  updateUserNotificationSetting,
  authUser,
  authManager,
  getUserById,
} from "../controllers/userController";

// BASEURL/user로 들어오는 요청을 전담한다.
const userRouter = express.Router();

// 따라서, 이 파일에서 루트 ( = "/") 가 의미하는 경로는 BASEURL/user가 된다.

// 사용자 프로필 조회
userRouter.get("/", authUser, getUserByToken);
// 대여자 정보 조회
userRouter.get("/:id", authManager, getUserById);
// 알림 조회
userRouter.get("/notification", authUser, getUserNotifications);
// 알림 설정 업데이트
userRouter.post("/notification", authUser, updateUserNotificationSetting);

export default userRouter;
