import User from "../models/User";

// CREATE: 납부자 등록
export const createPayment = async (req, res) => {
    const { user_number, name } = req.body;

    try {
        // Validation
        if (!name || !user_number) {
            return res.status(400).send("모든 필수 입력값을 제공해야 합니다.");
        }

        let formattedUserNumber = user_number;

        // 입력된 user_number의 길이를 확인하여 년도 혹은 학번인지 판단
        if (user_number.length === 4) {
            // 년도인 경우, 데이터베이스에서 마지막 사용자 번호를 가져와서 +1하여 사용합니다.
            const lastUser = await User.findOne().sort({ user_number: -1 });
            const lastUserNumber = lastUser ? parseInt(lastUser.user_number.slice(0, -1)) + 1 : 1;
            formattedUserNumber = String(lastUserNumber).padStart(8, '0') + '1'; // 8자리로 만든 뒤에 '1'을 추가
        }

        // 사용자 등록
        await User.create({
            user_number: formattedUserNumber,
            name : name,
            email : formattedUserNumber
        });

        return res.status(200).send("등록 성공");
    } catch (error) {
        console.error("에러 발생:", error);
        return res.status(500).send("서버 오류 발생");
    }
};


// READ: 납부자 조회 (관리자 승인)

export const getAllPayment = async (req, res) => {
    const { user_number, name } = req.body;
    try {
        if (!user_number && !name) {
            return res
                .status(400)
                .send("학번 또는 이름 중 반드시 하나 이상 입력해주세요.");
        }
        let query = {};
        if (user_number) {
            query.user_number = user_number;
        }
        if (name) {
            query.name = name;
        }

        const data = await User.find(query);

        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};


// DELETE: 학생회비 납부자 삭제
export const deletePayment = async (req, res) => {
    const { user_id } = req.params;

    try {
        if (!user_id) {
            return res
                .status(400)
                .send("삭제할 유저의 id를 올바르게 입력해주세요");
        }
            await User.findByIdAndDelete(user_id);
            return res
                .status(200)
                .send("유저가 성공적으로 삭제되었습니다");

    } catch (error) {
        console.log(error);
        return res.status(500).send("내부 서버 오류");
    }
};

// READ : 납부자 정보 csv 파일받기

import { MongoClient } from 'mongodb';
import { parse } from 'json2csv';
import fs from 'fs';

export const getPaymentCsv = async (req, res) => {
    const uri = process.env.DB_URL; // MongoDB URI
    const dbName = 'test'; // Your MongoDB database name
    const collectionName = 'users'; // Your MongoDB collection name
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Query MongoDB for payment data
        const payments = await collection.find({}).toArray();

        // Convert JSON data to CSV format
        const csv = parse(payments);

        // Write CSV data to a file
        fs.writeFileSync('payments.csv', csv, 'utf-8');

        console.log('CSV 파일이 성공적으로 생성되었습니다 : payments.csv');

        // Send the CSV file as a response
        res.status(200).download('payments.csv', 'payments.csv');
    } catch (error) {
        console.error('내부 서버 오류:', error);
        res.status(500).send("내부 서버 오류");
    } finally {
        await client.close();
    }
}



