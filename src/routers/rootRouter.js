import express from "express";
import { email_auth, join, login } from "../controllers/userController";
import { check_is_member } from "../controllers/memberController";

// BASEURL/student로 들어오는 요청을 전담한다.
const rootRouter = express.Router();

// 따라서, 이 파일에서 루트 ( = "/") 가 의미하는 경로는 BASEURL/student가 된다.
// 회원가입
rootRouter.post("/join", join);

// 로그인
rootRouter.post("/login", login);

// 이메일 인증
rootRouter.post("/email_auth", email_auth);

// 학생회비 납부 여부 확인
rootRouter.get("/checkMember", check_is_member);

export default rootRouter;
