# 🎵 VINTURA

VINTURA는 HTML, CSS, JavaScript와 Node.js를 활용하여 개발한 웹 사이트입니다.

프론트엔드 화면 구성부터 백엔드 API와 데이터베이스 연동까지 웹 서비스의 전체적인 구조를 학습하고 직접 구현하기 위해 시작한 개인 프로젝트입니다.

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL
- mysql2

### Security
- bcryptjs
- dotenv

## ✨ 주요 기능

### 회원가입
- 사용자 정보 입력 및 MySQL 저장
- 아이디 중복 확인
- 비밀번호 8자 이상 검사
- 특수문자 포함 여부 검사
- 실시간 비밀번호 유효성 표시
- bcrypt를 이용한 비밀번호 해시 처리

### 로그인
- MySQL 사용자 조회
- bcrypt를 이용한 비밀번호 검증
- 로그인 성공 및 실패 처리
- 로그인 성공 시 메인 페이지 이동

## 🔄 로그인 처리 과정

사용자 로그인
↓
JavaScript Fetch API
↓
Node.js / Express API
↓
MySQL 사용자 조회
↓
bcrypt 비밀번호 검증
↓
로그인 성공
↓
메인 페이지 이동

## 💡 구현 내용

- HTML/CSS를 활용한 로그인 및 회원가입 UI 구현
- JavaScript를 활용한 DOM 및 이벤트 처리
- Fetch API를 활용한 비동기 서버 통신
- Express를 활용한 REST API 구현
- MySQL을 활용한 사용자 데이터 관리
- bcrypt를 활용한 비밀번호 해시 처리
- 아이디 중복 확인 API 구현

## 🔧 Troubleshooting

### MySQL 연결 오류

Node.js와 MySQL 연결 과정에서 `ER_ACCESS_DENIED_ERROR`가 발생했습니다.

MySQL 사용자 계정 및 비밀번호와 Node.js의 데이터베이스 연결 설정을 확인하여 문제를 해결했습니다.

### 비밀번호 보안

사용자의 비밀번호를 평문으로 데이터베이스에 저장하지 않고 bcrypt를 이용해 해시 처리한 후 저장하도록 구현했습니다.

## 🚀 향후 개발 예정

- 로그인 세션
- 로그아웃
- 로그인 사용자 정보 표시
- 사용자 프로필 등록
