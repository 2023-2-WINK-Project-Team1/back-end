import AlertLog from "../models/AlertLog";
import User from '../models/User';

// READ

// 사용자 알림 내역 조회
export const getAlertLogsByUserId = async (req, res) => {
    try {
        // 사용자를 ID로 조회합니다.
        const { user_id } = req.params;

        const user = await User.findById(user_id);

        if (!user) {
            throw new Error('사용자를 찾을 수 없습니다.');
        }

        const data = await AlertLog.find({ alert_user: user.name })

        // 사용자의 이름과 create_user가 같은 알림 로그를 조회합니다.
        return res.status(200).send(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("내부 서버 오류");
    }
};

export const createAlertLog = async (name, message) => {
    try {

        // AlertLog 모델을 사용하여 새로운 알림 로그 생성
        const alertLog = new AlertLog({
            alert_user: name,
            message: message
        });

        // 생성된 알림 로그를 데이터베이스에 저장
        const savedAlertLog = await alertLog.save();

        // 저장된 알림 로그 반환
        return savedAlertLog;
    } catch (error) {
        console.error(error);
        throw new Error("알림 로그 생성 중 오류 발생");
    }
};


// UPDATE - Not applicable for Alert Logs

// DELETE - Not applicable for Alert Logs
