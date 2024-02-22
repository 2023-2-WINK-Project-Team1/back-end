import User from "../models/User";
import nodemailer from "nodemailer";
import ejs from "ejs";
import crypto from "crypto";
import { check_is_member } from "./memberController";

let email_auth_key_dict = {};

export const email_auth = async (req, res) => {
  const { email } = req.body;

  //////////// 유효성 검사

  // 이메일 형식에 맞는지 확인
  const vaildCheck = email.indexOf("@");
  if (!email || email.length === 0 || vaildCheck === -1) {
    return res.status(400).json({ message: "이메일 형식이 아닙니다." });
  }

  // 존재하는 이메일인 여부 확인
  const isUser = await User.findOne({ where: { email } });
  console.log(isUser);
  if (isUser) {
    return res.status(400).json({ message: "이미 가입한 메일입니다." });
  }

  //////////// 해시코드 생성
  const code = crypto.randomBytes(3).toString("hex");
  if (code) {
    email_auth_key_dict[email] = code;
  }
  console.log(email_auth_key_dict);

  //////////// 이메일 작성 및 발송
  //발송 할 ejs 준비
  let emailTemplate;
  ejs.renderFile(
    __dirname + "/../templates/email_auth.ejs", //ejs파일 위치
    { email, code },
    (err, data) => {
      //ejs mapping
      if (err) {
        console.log(err);
      }
      emailTemplate = data;
    }
  );
  // transport 생성
  const transporter = nodemailer.createTransport({
    //? 아래와같이 설정해준다
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    //? 여기엔 아까 생성한 앱 비밀번호와 이메일을 입력해준다.
    auth: {
      //? dotenv 환경변수를 이용하는 편이 보안에도 좋다
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWD,
    },
  });
  // 메일 발송
  transporter.sendMail(
    {
      from: `BackEndLeader<${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: "[ WINK X CONNECT ] 「 빌릴게 」 회원가입 인증메일 입니다.",
      html: emailTemplate,
    },
    (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        console.log(`Email 발송완료 (dest : ${email})` + info.response);
      }
    }
  );
  res.status(200).json({
    code: 200,
    message: "발송 성공",
  });

  /////////// 10분이 지난 후 인증코드 삭제
  setTimeout(() => {
    delete email_auth_key_dict[email];
    console.log(`delete code for ${email}`);
    console.log(email_auth_key_dict);
  }, 10 * 60 * 1000);
};

// 회원가입
export const join = async (req, res) => {
  const { user_number, name, email, code, password, password2 } = req.body;
  console.log(email);
  // console.log(req.body);
  // 인증번호 확인
  if (email_auth_key_dict[email] != code) {
    console.log(email_auth_key_dict[email]);
    return res.status(400).send("인증번호가 일치하지 않습니다.");
  }

  // 비밀번호 확인
  if (password !== password2) {
    return res.status(400).send("비밀번호 확인이 일치하지 않습니다.");
  }

  // 가입 여부 확인 (학번, 이메일)
  const exists = await User.exists({ $or: [{ user_number }, { email }] });
  if (exists) {
    return res.status(400).send("이미 가입한 학번/이메일 입니다.");
  }

  // 학생회비 납부여부 확인
  const { is_member, is_manager } = await check_is_member(user_number, name);
  // console.log(is_member);
  if (!is_member) {
    return res.status(400).send("학생회비 납부자가 아닙니다.");
  }
  try {
    await User.create({
      user_number,
      name,
      email,
      password,
      is_manager,
    });
    return res.status(200).send("회원가입 성공");
  } catch (e) {
    console.log("에러 발생 : ", e);
    return res.status(500).send("알 수 없는 에러 발생");
  }
};

// 로그인
export const login = async (req, res) => {
  const { user_number, password } = req.body;
  console.log(user_number, password);

  const user = await User.findOne({ user_number });

  if (!user) {
    return res.status(400).send("존재하지 않는 계정입니다.");
  }

  await user.comparePassword(password, (err, isMatch) => {
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).send("잘못된 비밀번호 입니다.");
    }
    console.log("compare");
  });

  await user.generateToken((err, user) => {
    // console.log(err, user);
    if (err) return res.status(400).send(err);
    // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지, 세션 등등
    console.log("token");
    return res.status(200).send({ success: true, user });
  });
};

export const logout = async (req, res, next) => {
  console.log("call logout");
  const { id } = req.user;
  await User.findOneAndUpdate({ _id: id }, { token: "" }).then((user, err) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
      logout: "로그아웃 완료",
    });
  });
};

// 사용자 인증 처리
export const authUser = (req, res, next) => {
  console.log();
  const token = req.get("Authorization");
  console.log(token);
  // console.log(User.findByToken(token));
  User.findByToken(token, (err, user) => {
    // console.log(err, user);
    // if (err) throw err;
    if (!user) {
      // console.log("not found user");
      return res.status(400).send("사용자 인증 실패");
    } else {
      // 토큰 인증 성공시 다음 진행
      req.token = token;
      req.user = user;
      next();
    }
  });
};

// 관리자 인증 처리
export const authManager = (req, res, next) => {
  // console.log("start authManager");
  console.log(req);
  const token = req.Authorization.x_auth;
  console.log(token);
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(400).send("사용자 인증 실패, 로그인이 필요합니다.");
      // .json({ isAuth: false, error: true })
    }

    // console.log(user);
    const { is_manager } = user;
    if (!is_manager) return res.status(401).send("관리자가 아닙니다.");

    // 토큰 인증 성공시 다음 진행
    req.token = token;
    req.user = user;

    next();
  });
};

// READ

// 프로필 조회
export const getUserProfile = async (req, res) => {
  try {
    // 조회된 사용자 프로필을 클라이언트에게 응답합니다.
    return res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("서버 오류 발생");
  }
};

// 알림 조회
export const getUserNotifications = async (req, res) => {
  try {
    return res.status(200).json({ notification: req.user.notification });
  } catch (error) {
    console.error(error);
    return res.status(500).send("서버 오류 발생");
  }
};

// UPDATE

// 알림 설정 업데이트
export const updateUserNotificationSetting = async (req, res) => {
  const { notification } = req.body;

  try {
    const user = req.user;
    console.log(user);
    user.notification = notification;
    // 주의 표시는 mongodb 파일에 안불러와서 생깁니다.
    console.log(user);
    await user.save();
    // 업데이트된 알림 설정을 클라이언트에게 응답합니다.
    return res.status(200).json({ notification: user.notification });
  } catch (error) {
    console.error(error);
    return res.status(500).send("서버 오류 발생");
  }
};

// DELETE
