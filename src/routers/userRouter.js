import express from "express";
import {
  getUserProfile,
  getUserNotifications,
  updateUserNotificationSetting,
  authUser,
} from "../controllers/userController";

// BASEURL/user로 들어오는 요청을 전담한다.
const userRouter = express.Router();

// 따라서, 이 파일에서 루트 ( = "/") 가 의미하는 경로는 BASEURL/user가 된다.

// 프로필 조회
userRouter.get("/:userId", authUser, getUserProfile);
// 알림 조회
userRouter.get("/:userId/notification", authUser, getUserNotifications);
// 알림 설정 업데이트
userRouter.post(
  "/:userId/notification",
  authUser,
  updateUserNotificationSetting
);

export default userRouter;
