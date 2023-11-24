import express from "express";
import {
  createTest,
  deleteTest,
  getTest,
  updateTest,
} from "../controllers/testController";

// BASEURL/test로 들어오는 요청을 전담한다.
const testRouter = express.Router();

// 따라서, 이 파일에서 루트 ( = "/") 가 의미하는 경로는 BASEURL/test가 된다.

testRouter.get("/", getTest);
testRouter.post("/", createTest);
testRouter.patch("/", updateTest);
testRouter.delete("/", deleteTest);

export default testRouter;
