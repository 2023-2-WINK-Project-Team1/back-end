import Rental from "../models/rental";

// READ: 모든 대여 내역 조회 (관리자 승인)
export const getAllRentals = async (req, res) => {
    try {
        const data = await Rental.find({});
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};

// READ: 사용자 대여 내역 조회
export const getUserRentals = async (req, res) => {
    const { user_id } = req.params;
    try {
        const data = await Rental.find({ createdBy: user_id });
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};

// CREATE: 사용자 대여 신청
export const createRentalRequest = async (req, res) => {
    const { createdBy, productName, quantity } = req.body;
    try {
        await Rental.create({ createdBy, productName, quantity });
        return res.status(200).send("사용자 대여 신청이 성공적으로 생성되었습니다");
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};

// UPDATE: 사용자 대여 신청 승인 (관리자)
export const approveRentalRequest = async (req, res) => {
    const { rental_history_id } = req.params;
    try {
        await Rental.findByIdAndUpdate(rental_history_id, { $set: { approvalDate: new Date() } });
        return res.status(200).send("사용자 대여 신청이 성공적으로 승인되었습니다");
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};

// DELETE: 사용자 대여 신청 취소
export const cancelRentalRequest = async (req, res) => {
    const { createdBy } = req.body;
    try {
        await Rental.deleteMany({ createdBy });
        return res.status(200).send("사용자 대여 신청이 성공적으로 취소되었습니다");
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};

// UPDATE: 관리자 반납 완료 처리
export const completeReturn = async (req, res) => {
    const { rental_history_id } = req.params;
    try {
        await Rental.findByIdAndUpdate(rental_history_id, { $set: { returnStatus: true } });
        return res.status(200).send("반납이 성공적으로 완료되었습니다");
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};
