import express from "express";
import testRouter from "./routers/testRouter";
import bodyParser from "body-parser";

const app = express();

// set bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("home");
  res.send("home");
});

// BASEURL/test로 들어온 요청은 testRouter로 전달한다.
app.use("/test", testRouter);

export default app;
