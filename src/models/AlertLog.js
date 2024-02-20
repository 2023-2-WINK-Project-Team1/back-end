import mongoose, { Schema } from "mongoose";

const alertLogSchema = new Schema({
    alert_user: { type: String, default: null,required: true  },
    message: { type: String, default: "", required: true }, // 문자열 기본값으로 수정
})

const AlertLog = mongoose.model("AlertLog", alertLogSchema);

export default AlertLog;
