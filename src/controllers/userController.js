import user from "../models/user";

// READ

// 프로필 조회
export const getUserProfile = async (req, res) => {
    const userId = req.params.userId;

    try {
        // 사용자 ID를 기반으로 데이터베이스에서 사용자 프로필을 조회합니다.
        const userProfile = await user.findById(userId);

        if (!userProfile) {
            return res.status(404).send("사용자를 찾을 수 없습니다.");
        }

        // 조회된 사용자 프로필을 클라이언트에게 응답합니다.
        return res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).send("서버 오류 발생");
    }
};

// 알림 조회
export const getUserNotifications = async (req, res) => {
    const userId = req.params.userId;

    try {
        // 사용자 ID를 기반으로 데이터베이스에서 사용자 알림을 조회합니다.
        const userNotifications = await user.findById(userId, 'notification');

        if (!userNotifications) {
            return res.status(404).send("사용자를 찾을 수 없습니다.");
        }

        // 조회된 사용자 알림을 클라이언트에게 응답합니다.
        return res.status(200).json({ notification: userNotifications.notification });
    } catch (error) {
        console.error(error);
        return res.status(500).send("서버 오류 발생");
    }
};

// CREATE

// UPDATE

// 알림 설정 업데이트
export const updateUserNotificationSetting = async (req, res) => {
    const userId = req.params.userId;
    const { notificationSetting } = req.body;

    try {
        // 사용자 ID를 기반으로 데이터베이스에서 해당 사용자를 찾습니다.
        const User = await user.findById(userId);

        if (!User) {
            return res.status(404).send("사용자를 찾을 수 없습니다.");
        }

        // 사용자의 알림 설정을 업데이트합니다.
        User.notification = notificationSetting;
        // 주의 표시는 mongodb 파일에 안불러와서 생깁니다.
        await User.save();

        // 업데이트된 알림 설정을 클라이언트에게 응답합니다.
        return res.status(200).json({ notification: User.notification });
    } catch (error) {
        console.error(error);
        return res.status(500).send("서버 오류 발생");
    }
};


// DELETE