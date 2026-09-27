const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "asd7517162",
    database: "vinto"
});
db.connect(function(error) {
    if (error) {
        console.log("연결 실패");
        console.log(error);
        return;
    }
    console.log("연결 성공");
});

//아이디 중복확인
app.get("/api/check-id", function(req, res) {
    const userId = req.query.user_id;
    if (!userId) {
        return res.json({
            available: false
        });
    }
    const sql = "SELECT id FROM users WHERE user_id = ? LIMIT 1";
    db.query(sql, [userId], function(error, results) {
        if (error) {
            console.log(error);

            return res.status(500).json({
                available: false
            });
        }
        if (results.length === 0) {
            return res.json({
                available: true
            });
        }
        return res.json({
            available: false
        });
    });
});
//회원가입
app.post("/api/register", async function(req, res) {
    const {user_id, user_password, phone, nickname, name} = req.body;
    if (!user_id || !user_password || !phone || !nickname || !name) {
        return res.json({
            success: false,
            message: "모든 정보를 입력해주세요."
        });
    }
    if (user_id.length < 4) {
        return res.json({
            success: false,
            message: "아이디는 4자 이상 입력해주세요."
        });
    }

    if (user_password.length < 8) {
        return res.json({
            success: false,
            message: "비밀번호는 8자 이상 입력해주세요."
        });
    }

    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;

    if (!specialCharacter.test(user_password)) {
        return res.json({
            success: false,
            message: "특수문자를 1개 이상 조합하여 비밀번호를 만들어주세요."
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(user_password, 10);

        const sql = "INSERT INTO users (user_id, user_password, phone, nickname, name) VALUES (?, ?, ?, ?, ?)";

        db.query(sql, [user_id, hashedPassword, phone, nickname, name], function(error, result) {
            if (error) {
                console.log(error);
                //닉네임 중복 확인
                if (error.code === "ER_DUP_ENTRY") {
                    return res.json({
                        success: false,
                        message: "이미 사용 중인 아이디 또는 닉네임입니다."
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: "회원가입 중 오류가 발생했습니다."
                });
            }
            return res.json({
                success: true,
                message: "회원가입 성공"
            });
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "서버 오류가 발생했습니다."
        });
    }
});

app.post("/api/login", function(req, res) {
    const {user_id, user_password} = req.body;
    if (!user_id || !user_password) {
        return res.json({
            success: false,
            message: "아이디와 비밀번호를 입력해주세요."
        });
    }
    const sql = "SELECT * FROM users WHERE user_id = ? LIMIT 1";
    db.query(sql, [user_id], async function(error, results) {
        if (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
            });
        }
        if (results.length === 0) {
            return res.json({
                success: false,
                message: "아이디 또는 비밀번호가 올바르지 않습니다."
            });
        }
        const user = results[0];
        try {
            const passwordMatch = await bcrypt.compare(user_password, user.user_password);

            if (!passwordMatch) {
                return res.json({
                    success: false,
                    message: "아이디 또는 비밀번호가 올바르지 않습니다."
                });
            }
            return res.json({
                success: true,
            });
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
            });
        }
    });
});
app.listen(PORT, function() {
    console.log(`서버 실행: http://localhost:${PORT}`);
});