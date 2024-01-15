import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    created: { type: Date, required: true, default: Date.now },
    create_user: { type: String, required: true },  // 생성 유저 이름 또는 ID 등의 정보
    product_name: { type: String, required: true },
    count: { type: Number, required: true },
    approved: { type: Date },  // 승인 날짜, 선택적 필드
    approved_manager: { type: String },  // 승인 매니저 이름 또는 ID 등의 정보, 선택적 필드
    returned: { type: Boolean, default: false },  // 반납 여부, 기본값은 false
    return_check_manager: { type: String },  // 반납 확인 매니저 이름 또는 ID 등의 정보, 선택적 필드
});

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;

