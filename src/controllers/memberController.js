import fs from "fs/promises";
import csv from "csv-parser";
import { Readable } from "stream";
import User from "../models/User";

async function readCSVFile(filePath) {
  try {
    const results = [];

    const fileContents = await fs.readFile(filePath, "utf-8");

    return new Promise((resolve, reject) => {
      const readableStream = Readable.from(fileContents);

      readableStream
        .pipe(csv())
        .on("data", (data) => {
          // 각 행의 데이터 처리 로직을 여기에 추가
          results.push(data);
        })
        .on("end", () => {
          // CSV 파일을 모두 읽은 후 마지막에 실행되는 로직
          resolve(results);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  } catch (error) {
    throw new Error(`파일 읽기 오류: ${error.message}`);
  }
}

export const check_is_member = async (user_number, name) => {
  // const { user_number, name } = req.body;
  console.log(user_number, name);

  const csvFilePath = __dirname + "/../resources/refined_data.csv";
  const memberData = await readCSVFile(csvFilePath);

  if (memberData) {
    console.log("데이터 불러오기 성공");
    // console.log(memberData);
  } else {
    console.log("데이터 불러오기 실패");
    return false;
  }

  const targetYear = user_number.substring(0, 4);
  // console.log(targetYear);

  const keys = Object.keys(memberData[0]);

  // 입학년도와 이름이 일치하는 데이터를 찾기
  const matchingData = memberData.filter(
    (item) => item[keys[0]] == targetYear && item[keys[1]] === name
  );

  // console.log(typeof matchingData, matchingData.length);
  // console.log(matchingData[0]["복지부"]);

  if (matchingData.length) {
    // return res.status(200).json({ message: "학생회비 납부자 입니다." });
    const is_manager = matchingData[0]["복지부"] ? true : false;
    console.log("학생회비 납부자 입니다.");
    return { is_member: true, is_manager };
  } else {
    // return res.status(400).json({ message: "학생회비 납부자가 아닙니다." });
    console.log("학생회비 납부자가 아닙니다.");
    return { is_member: false, is_manager: false };
  }
};

export const add_member = async (req, res) => {
  console.log(req.body);
  const { code } = req.body;
  console.log(code);
  if (code !== "가보자고") {
    return res.status(404).send("넌 안돼");
  }
  const csvFilePath = __dirname + "/../resources/refined_data.csv";
  const memberData = await readCSVFile(csvFilePath);

  if (memberData) {
    console.log("데이터 불러오기 성공");
  } else {
    console.log("데이터 불러오기 실패");
    return res.status(500).send("데이터 불러오기 실패");
  }
  const keys = Object.keys(memberData[0]);
  let cnt = 1000;
  for (const member of memberData) {
    let user_number =
      memberData[0][keys[2]] === ""
        ? member[keys[0]] + cnt + "1"
        : memberData[0][keys[2]];
    let name = member[keys[1]];
    let is_manager = member[keys[3]] === "" ? false : true;
    try {
      await User.create({
        user_number,
        name,
        is_manager,
      });
      if (is_manager) {
        console.log("가입완료 : ", user_number, name, is_manager);
      }
      cnt += 1;
    } catch (e) {
      console.log("에러 발생 : ", e);
    }
  }

  return res.status(200).send("success");
};
