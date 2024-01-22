import express from "express";
import testRouter from "./routers/testRouter";
import userRouter from "./routers/userRouter";
import itemRouter from "./routers/itemRouter";
import bodyParser from "body-parser";
import rentalRouter from "./routers/rentalRouter";

const app = express();

// set bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("home");
  res.send("home");
});

// BASEURL/user로 들어온 요청은 userRouter로 전달한다.
app.use("/user", userRouter);
app.use("/rental", rentalRouter);

// BASEURL/test로 들어온 요청은 testRouter로 전달한다.
app.use("/test", testRouter);
app.use("/items", itemRouter);

export default app;
