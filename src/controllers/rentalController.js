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
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send("사용자를 찾을 수 없습니다.");
    }
    const data = await Rental.find({ create_user: user._id });
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send("내부 서버 오류");
  }
};

// CREATE: 사용자 대여 신청
export const createRental = async (req, res) => {
  const { item_id, count } = req.body;
  const user_id = req.user._id;
  console.log(user_id);
  try {
    // Validation
    if (!item_id || !count || !user_id) {
      return res.status(400).send("모든 필수 입력값을 제공해야 합니다.");
    }

    await Rental.create({
      create_user: user_id,
      item: item_id,
      count,
    });

    // Success Response
    return res.status(200).send("사용자 대여 신청 성공");
  } catch (error) {
    console.error(error);

    // Error Response
    return res.status(500).send("내부 서버 오류");
  }
};

// UPDATE: 사용자 대여 신청 승인 (관리자)
export const approveRental = async (req, res) => {
  const { rental_id } = req.params;
  const manager_id = req.user._id;
  try {
    if (!rental_id || !manager_id) {
      return res.status(400).send("모든 필수 입력값을 제공해야 합니다.");
    }

    await Rental.findByIdAndUpdate(rental_id, {
      approved_manager: manager_id,
      approved: new Date(),
    });
    return res.status(200).send("사용자 대여 신청이 성공적으로 승인되었습니다");
  } catch (error) {
    console.log(error);
    return res.status(500).send("내부 서버 오류");
  }
};

// DELETE: 사용자 대여 신청 취소
export const cancelRental = async (req, res) => {
  const { rental_id } = req.params;
  const user_id = req.user._id;

  // 본인 요청인 경우에만 삭제 가능하게 하기.
  try {
    if (!rental_id) {
      return res
        .status(400)
        .send("삭제할 대여 내역의 id를 올바르게 입력해주세요");
    }
    const { create_user } = await Rental.findOne({ _id: rental_id });

    // console.log(_id, create_user);
    if (create_user.equals(user_id)) {
      await Rental.findByIdAndDelete(rental_id);
      return res
        .status(200)
        .send("사용자 대여 신청이 성공적으로 취소되었습니다");
    }
    return res.status(400).send("사용자의 대여 내역이 아닙니다.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("내부 서버 오류");
  }
};

// UPDATE: 관리자 반납 완료 처리
export const returnRental = async (req, res) => {
  const { rental_id } = req.params;
  const manager_id = req.user._id;

  try {
    if (!rental_id) {
      return res.status(400).send("입력이 올바르지 않습니다.");
    }

    // Use findByIdAndUpdate to update the rental document
    await Rental.findByIdAndUpdate(rental_id, {
      return_check_manager: manager_id,
      returned: new Date(),
    });

    return res.status(200).send("반납이 성공적으로 완료되었습니다");
  } catch (error) {
    console.log(error);
    return res.status(500).send("내부 서버 오류");
  }
};
