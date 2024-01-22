import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    // _id : { rental_history_id },
    created: { type: Date, required: true, default: Date.now },
    create_user: {
        type: String, // 또는 다른 적절한 타입으로 변경
        ref: "User.name", // "User" 모델의 "name" 필드를 참조
        required: true
    }, // 생성 유저 이름 또는 ID 등의 정보
    product_name: {
        type: String, // 또는 다른 적절한 타입으로 변경
        ref: "Item.product_name", // "Item" 모델의 "product_name" 필드를 참조
        required: true
    },
    count: {
        type: String, // 또는 다른 적절한 타입으로 변경
        ref: "Item.count", // "Item" 모델의 "count" 필드를 참조
        required: true
    },
    approved: { type: Date },  // 승인 날짜, 선택적 필드
    approved_manager: { type: String },  // 승인 매니저 이름 또는 ID 등의 정보, 선택적 필드
    returned: { type: Boolean, default: false },  // 반납 여부, 기본값은 false
    return_check_manager: { type: String },  // 반납 확인 매니저 이름 또는 ID 등의 정보, 선택적 필드
});

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;

