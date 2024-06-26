import User from "../models/User";
import { parse } from 'json2csv';
import fs from 'fs';

// CREATE: 납부자 등록
export const createPayment = async (req, res) => {
    const { user_number, name } = req.body;

    try {
        // Validation
        if (!name || !user_number) {
            return res.status(400).send("학번 또는 년도와 이름을 필수로 입력해야 합니다.");
        }

        // 입력된 user_number의 길이를 확인하여 알맞는 학번인지 판단
        if (user_number.length !== 8 || (20000000 > user_number) || (21000000 < user_number) ) {
            return res.status(400).send("알맞는 학번 8자리와 이름을 입력해야 합니다.");
        }

        // 사용자 등록
        await User.create({
            user_number: user_number,
            name : name,
            email: user_number
        });

        return res.status(200).send("등록 성공");
    } catch (error) {
        console.error("에러 발생:", error);
        return res.status(500).send("서버 오류 발생");
    }
};


// READ: 납부자 조회 (관리자 승인)

export const getPayment = async (req, res) => {
    const { year, name } = req.body;
    try {
        if (!name) {
            return res
                .status(400)
                .send("이름을 입력해주세요.");
        }
        if (year&&year.length !== 4) {
            return res.status(400).send("년도를 바르게 입력해야 합니다.");
        }
        let query = {};

        if (name) {
            query.name = name;
        }
        if (year) {
            query.user_number = new RegExp(`^${year}`);
        }

        const data = await User.find(query);

        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};


// READ : 납부자 정보 csv 파일받기

export const getPaymentCsv = async (req, res) => {
    try {
        // MongoDB에서 납부자 정보 조회
        const users = await User.find({}).lean(); // lean()을 사용하여 조회 성능을 향상

        // JSON 데이터를 CSV 형식으로 변환
        const csv = parse(users);

        // 비동기 방식으로 CSV 데이터를 파일에 작성
        fs.writeFile('payments.csv', csv, 'utf-8', (err) => {
            if (err) {
                console.error('CSV 파일 생성 중 오류 발생:', err);
                return res.status(500).send("CSV 파일 생성 중 오류 발생");
            }

            console.log('CSV 파일이 성공적으로 생성되었습니다: payments.csv');

            // 생성된 CSV 파일을 응답으로 전송
            res.status(200).download('payments.csv', 'payments.csv', (downloadErr) => {
                if (downloadErr) {
                    console.error('CSV 파일 다운로드 중 오류 발생:', downloadErr);
                    return res.status(500).send("CSV 파일 다운로드 중 오류 발생");
                }
            });
        });
    } catch (error) {
        console.error('내부 서버 오류:', error);
        res.status(500).send("내부 서버 오류");
    }
};

