import express from "express";
import {
  authUser,
  email_auth,
  join,
  login,
  logout,
} from "../controllers/userController";

// BASEURL/student로 들어오는 요청을 전담한다.
const rootRouter = express.Router();

// 따라서, 이 파일에서 루트 ( = "/") 가 의미하는 경로는 BASEURL/가 된다.
// 회원가입
rootRouter.post("/join", join);

// 로그인
rootRouter.post("/login", login);

// 로그아웃
rootRouter.get("/logout", authUser, logout);

// 이메일 인증
rootRouter.post("/email_auth", email_auth);

export default rootRouter;
