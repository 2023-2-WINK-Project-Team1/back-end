import express from "express";
import {
    getAllRentals,
    getUserRentals,
    createRentalRequest,
    approveRentalRequest,
    cancelRentalRequest,
    completeReturn,
} from "../controllers/rentalController";

const rentalRouter = express.Router();

// 전체 대여 내역 조회 (관리자 승인을 위한)
rentalRouter.get("/", getAllRentals);

// 사용자 대여 내역 조회
rentalRouter.get("/:user_id", getUserRentals);

// 사용자 대여 신청
rentalRouter.post("/", createRentalRequest);

// 사용자 대여 신청 승인 (관리자)
rentalRouter.post("/approve/:rental_history_id", approveRentalRequest);

// 사용자 대여 신청 취소
rentalRouter.delete("/", cancelRentalRequest);

// 관리자 반납 완료 처리
rentalRouter.post("/return-approve/:rental_history_id", completeReturn);

export default rentalRouter;
