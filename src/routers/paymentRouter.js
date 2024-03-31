import express from "express";
import {
    getAllPayment,
    createPayment,
    deletePayment,
    getPaymentCsv
} from "../controllers/paymentControllers";
import { authManager } from "../controllers/userController";

// BASEURL/payment로 들어오는 요청을 전담한다.
const paymentRouter = express.Router();

// 따라서, 이 파일에서 루트 ( = "/") 가 의미하는 경로는 BASEURL/payment가 된다.

paymentRouter.get("/", getAllPayment,authManager);
paymentRouter.post("/", createPayment,authManager);
paymentRouter.delete("/:user_id", deletePayment,authManager);
paymentRouter.get("/csv",getPaymentCsv,authManager);

export default paymentRouter;