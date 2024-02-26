import express from "express";
import {
  getAllRentals,
  getUserRentals,
  createRental,
  approveRental,
  cancelRental,
  returnRental,
} from "../controllers/rentalController";
import { authManager, authUser } from "../controllers/userController";

const rentalRouter = express.Router();

// 전체 대여 내역 조회 (관리자 승인을 위한)
rentalRouter.get("/all", authManager, getAllRentals);

// 사용자 대여 내역 조회
rentalRouter.get("/", authUser, getUserRentals);

// 사용자 대여 신청
rentalRouter.post("/", authUser, createRental);

// 사용자 대여 신청 승인 (관리자)
rentalRouter.post("/approve/:rental_id", authManager, approveRental);

// 사용자 대여 신청 취소
rentalRouter.delete("/:rental_id", authUser, cancelRental);

// 관리자 반납 완료 처리
rentalRouter.post("/return/:rental_id", authManager, returnRental);

export default rentalRouter;
