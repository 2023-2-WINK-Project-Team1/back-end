import mongoose, { Schema } from "mongoose";

const rentalSchema = new mongoose.Schema({
  // _id : { rental_history_id },
  created: { type: Date, required: true, default: Date.now },
  create_user: {
    type: Schema.Types.ObjectId, // 또는 다른 적절한 타입으로 변경
    ref: "User", // "User" 모델의 id를 참조
    required: true,
  }, // 생성 유저 이름 또는 ID 등의 정보
  item: {
    type: Schema.Types.ObjectId, // 또는 다른 적절한 타입으로 변경
    ref: "Item", // "Item" 모델의 "product_name" 필드를 참조
    required: true,
  },
  count: { type: String, default: 0, required: true }, // 또는 다른 적절한 타입으로 변경
  approved: { type: Date, default: null }, // 승인 날짜, 선택적 필드
  approved_manager: { type: Schema.Types.ObjectId, ref: "User", default: null }, // 승인 매니저 이름 또는 ID 등의 정보, 선택적 필드
  returned: { type: Date, default: null }, // 반납 여부, 기본값은 false
  return_check_manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }, // 반납 확인 매니저 이름 또는 ID 등의 정보, 선택적 필드
});

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;
