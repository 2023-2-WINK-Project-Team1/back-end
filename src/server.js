import express from "express";
import testRouter from "./routers/testRouter";
import userRouter from "./routers/userRouter";
import itemRouter from "./routers/itemRouter";
import bodyParser from "body-parser";
import rentalRouter from "./routers/rentalRouter";
import cookieParser from "cookie-parser";
import rootRouter from "./routers/rootRouter";
import cors from "cors";
import alertLogRouter from "./routers/alertLogRouter";
const app = express();

// set cors
const whitelist = [
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:3000",
  "http://bililge.s3-website.ap-northeast-2.amazonaws.com",
  "http://2024-01-webclient.s3-website.ap-northeast-2.amazonaws.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      // 만일 whitelist 배열에 origin인자가 있을 경우
      callback(null, true); // cors 허용
    } else {
      callback(new Error("Not Allowed Origin!")); // cors 비허용
    }
  },
};

app.use(cors(corsOptions)); // 옵션을 추가한 CORS 미들웨어 추가

// set bodyParser
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("home");
  res.send("home");
});

// BASEURL/user로 들어온 요청은 userRouter로 전달한다.
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/alertLog", alertLogRouter);
app.use("/rental", rentalRouter);
app.use("/test", testRouter);
app.use("/items", itemRouter);

export default app;
