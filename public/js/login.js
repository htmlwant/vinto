const loginForm = document.getElementById("loginForm");
const userId = document.getElementById("user_id");
const userPassword = document.getElementById("user_password");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const id = userId.value.trim();
    const password = userPassword.value;

    if (id === "") {
        errorMessage.textContent = "아이디를 입력해주세요.";
        userId.focus();
        return;
    }
    if (password === "") {
        errorMessage.textContent = "비밀번호를 입력해주세요.";
        userPassword.focus();
        return;
    }
    errorMessage.textContent = "";
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: id,
                user_password: password
            })
        });
        const result = await response.json();
        if (result.success) {
            location.href = "index.html";
        } else {
            errorMessage.textContent = result.message;
        }
    } catch (error) {
        console.log(error);
        errorMessage.textContent = "서버와 연결할 수 없습니다.";
    }
});