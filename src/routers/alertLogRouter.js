import express from "express";
import {
    getAlertLogsByUserId,
} from "../controllers/alertLogController";
//import { authManager, authUser } from "../controllers/userController";

const alertLogRouter = express.Router();

// 사용자 알람 로그 조회
alertLogRouter.get("/:user_id",  getAlertLogsByUserId);

export default alertLogRouter;