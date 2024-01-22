import Rental from "../models/Rental";
import User from "../models/User";

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
        const user = await User.findById(user_id,"name");
        if (!user) {
            return res.status(404).send("사용자를 찾을 수 없습니다.");
        }
        const data = await Rental.find({ create_user: user.name });
        return res.status(200).send(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("내부 서버 오류");
    }
};

// CREATE: 사용자 대여 신청
export const createRentalRequest = async (req, res) => {
    const { product_name, count, user_id } = req.body;

    try {
        // Validation
        if ( !product_name || !count || !user_id) {
            return res.status(400).send("모든 필수 입력값을 제공해야 합니다.");
        }

        // Create Rental
        const currentDate = new Date(); // 현재 날짜와 시간
        await Rental.create({ created:currentDate,create_user:user_id, product_name, count ,approved:null,approved_manager:null,returned:false,return_check_manager:null});

        // Success Response
        return res.status(200).send("사용자 대여 신청이 성공적으로 생성되었습니다");
    } catch (error) {
        console.error(error);

        // Error Response
        return res.status(500).send("내부 서버 오류");
    }
};

// UPDATE: 사용자 대여 신청 승인 (관리자)
export const approveRentalRequest = async (req, res) => {
    const { rental_history_id } = req.params;
    const { approved_manager } = req.body;
    try {
        if (!rental_history_id || !approved_manager) {
            return res.status(400).send("모든 필수 입력값을 제공해야 합니다.");
        }
        // Create an object with fields to update
        const updateFields = {
            approved_manager: approved_manager,
            approved: new Date(),
        };

        await Rental.findByIdAndUpdate(rental_history_id, { $set:  updateFields  });
        return res.status(200).send("사용자 대여 신청이 성공적으로 승인되었습니다");
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};

// DELETE: 사용자 대여 신청 취소
export const cancelRentalRequest = async (req, res) => {
    const { created } = req.body;
    try {
        if (!created) {
            return res.status(400).send("모든 필수 입력값을 제공해야 합니다.");
        }
        await Rental.deleteMany({ created });
        return res.status(200).send("사용자 대여 신청이 성공적으로 취소되었습니다");
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};

// UPDATE: 관리자 반납 완료 처리
export const completeReturn = async (req, res) => {
    const { rental_history_id  } = req.params;
    const { return_check_manager } = req.body;
    try {
        if (!rental_history_id || !return_check_manager) {
            return res.status(400).send("관리자 성함을 넣어주세요.");
        }

        // Create an object with fields to update
        const updateFields = {
            return_check_manager: return_check_manager,
            returned: true,
        };

        // Use findByIdAndUpdate to update the rental document
        await Rental.findByIdAndUpdate(rental_history_id, { $set: updateFields });

        return res.status(200).send("반납이 성공적으로 완료되었습니다");
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};

