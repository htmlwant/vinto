const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");
const userIdInput = document.getElementById("user_id");
const passwordInput = document.getElementById("user_password");
const idCheckMessage = document.getElementById("idCheckMessage");
const lengthCheck = document.getElementById("lengthCheck");
const specialCheck = document.getElementById("specialCheck");
const idCheckButton = document.getElementById("idCheckButton");

const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
let isIdAvailable = false;

// 아이디 중복확인
idCheckButton.addEventListener("click", async function () {
    const userId = userIdInput.value.trim();

    if (userId === "") {
        idCheckMessage.textContent = "아이디를 입력해주세요.";
        idCheckMessage.className = "check_message check_error";
        userIdInput.focus();
        return;
    }

    if (userId.length < 4) {
        idCheckMessage.textContent = "아이디는 4자 이상 입력해주세요.";
        idCheckMessage.className = "check_message check_error";
        isIdAvailable = false;
        return;
    }

    try {
        const response = await fetch("/api/check-id?user_id=" + encodeURIComponent(userId));
        const result = await response.json();

        if (result.available) {
            idCheckMessage.textContent = "✓ 사용 가능한 아이디입니다.";
            idCheckMessage.className = "check_message check_success";
            isIdAvailable = true;
        } else {
            idCheckMessage.textContent = "✕ 이미 사용 중인 아이디입니다.";
            idCheckMessage.className = "check_message check_error";
            isIdAvailable = false;
        }
    } catch (error) {
        console.log(error);
        idCheckMessage.textContent = "중복확인 중 오류가 발생했습니다.";
        idCheckMessage.className = "check_message check_error";
        isIdAvailable = false;
    }
});

// 중복확인 후 아이디를 변경하면 다시 확인
userIdInput.addEventListener("input", function () {
    isIdAvailable = false;

    if (userIdInput.value.trim() === "") {
        idCheckMessage.textContent = "";
    } else {
        idCheckMessage.textContent = "아이디 중복확인이 필요합니다.";
        idCheckMessage.className = "check_message";
    }
});

// 비밀번호 실시간 감지
passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;

    if (password.length >= 8) {
        lengthCheck.textContent = "✓ 8자 이상";
        lengthCheck.className = "valid";
    } else {
        lengthCheck.textContent = "✕ 8자 이상";
        lengthCheck.className = "invalid";
    }

    if (specialCharacter.test(password)) {
        specialCheck.textContent = "✓ 특수문자 1개 이상";
        specialCheck.className = "valid";
    } else {
        specialCheck.textContent = "✕ 특수문자 1개 이상";
        specialCheck.className = "invalid";
    }
});

// 회원가입
registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const userId = document.getElementById("user_id").value.trim();
    const userPassword = document.getElementById("user_password").value;
    const phone = document.getElementById("phone").value.trim();
    const nickname = document.getElementById("nickname").value.trim();
    const name = document.getElementById("name").value.trim();

    if (!isIdAvailable) {
        message.textContent = "아이디 중복확인을 해주세요.";
        userIdInput.focus();
        return;
    }

    if (userPassword.length < 8) {
        message.textContent = "비밀번호는 8자 이상 입력해주세요.";
        passwordInput.focus();
        return;
    }

    if (!specialCharacter.test(userPassword)) {
        message.textContent = "비밀번호에는 특수문자를 1개 이상 포함해주세요.";
        passwordInput.focus();
        return;
    }

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: userId,
                user_password: userPassword,
                phone: phone,
                nickname: nickname,
                name: name
            })
        });

        const result = await response.json();

        if (result.success) {
            alert("회원가입이 완료되었습니다.");
            location.href = "login.html";
        } else {
            message.textContent = result.message;
        }
    } catch (error) {
        console.log(error);
        message.textContent = "서버와 연결할 수 없습니다.";
    }
});