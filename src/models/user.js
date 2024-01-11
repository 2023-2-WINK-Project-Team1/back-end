import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // add schema
    //_id: { type: String, required: true }, id 제거
    user_number: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    notification : { type: Boolean, default: true },
    is_manager : { type: Boolean, default: false }
});

const user = mongoose.model("user", userSchema);

export default user;
