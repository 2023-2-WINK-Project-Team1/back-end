import express from "express";
import {
    getUserProfile,
    getUserNotifications,
    updateUserNotificationSetting,
} from '../controllers/UserController';

// BASEURL/student로 들어오는 요청을 전담한다.
const userRouter = express.Router();

// 따라서, 이 파일에서 루트 ( = "/") 가 의미하는 경로는 BASEURL/student가 된다.

// 프로필 조회
userRouter.get("/:userId", getUserProfile);
// 알림 조회
userRouter.get("/:userId/notification", getUserNotifications);
// 알림 설정 업데이트
userRouter.post("/:userId/notification", updateUserNotificationSetting);

export default userRouter;
