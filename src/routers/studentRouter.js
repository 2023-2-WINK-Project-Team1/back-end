import express from "express";
import {
    getUserProfile,
    getUserNotifications,
    updateUserNotificationSetting,
} from '../controllers/studentController';

// BASEURL/student로 들어오는 요청을 전담한다.
const studentRouter = express.Router();

// 따라서, 이 파일에서 루트 ( = "/") 가 의미하는 경로는 BASEURL/student가 된다.

// 프로필 조회
studentRouter.get("/:user_Id", getUserProfile);

// 알림 조회
studentRouter.get("/notification", getUserNotifications);

// 알림 설정 업데이트
studentRouter.post("/notification/:user_Id", updateUserNotificationSetting);

export default studentRouter;
