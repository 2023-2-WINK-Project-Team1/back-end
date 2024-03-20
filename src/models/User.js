import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  // add schema
  //_id: { type: String, required: true }, id 제거
  user_number: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  notification: { type: Boolean, default: true },
  is_manager: { type: Boolean, default: false },
  token: { type: String },
});

userSchema.pre("save", async function () {
  console.log("call this");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  console.log("call comparePassword");
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      cb(err, null);
    }
    cb(null, isMatch);
  });
};

// 토큰을 생성하는 메소드
userSchema.methods.generateToken = async function (cb) {
  console.log("call generateToken");
  const user = this;
  // jsonwebtoken을 이용해서 token을 생성하기
  const new_token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = new_token;
  await user.save().then((user, err) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

// 토큰을 복호화하는 메소드
userSchema.statics.findByToken = async function (token, cb) {
  // const user = this;
  // 토큰을 decode 한다.
  jwt.verify(token, "secretToken", async function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
    // console.log(decoded);
    const user = await User.findOne({ _id: decoded, token: token });
    if (!user) {
      cb(err, null);
    } else {
      cb(null, user);
    }
  });
};

const User = mongoose.model("User", userSchema);

export default User;
