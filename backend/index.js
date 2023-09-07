const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');
const cors = require('cors');
const path = require('path');

// .env 파일을 불러옴
dotenv.config();

// app.use() 함수는 Express 앱에서 항상 실행하는 미들웨어의 역할, URL에 상관없이 앱이 요청을 수신할 때마다 매번 실행
// It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

// Mongo DB 연결
mongoose.connect(process.env.MONGO_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Mongo DB connected!');
    })
    .catch((error) => {
        console.log(error);
    });

app.use('/api/pins/', pinRoute);
app.use('/api/users/', userRoute);
// CORS 설정
app.use(cors({
    origin: 'http://15.164.216.205', // AWS EC2 Nginx 클라이언트 서버 주소
    credentials: true // 필요한 경우, 인증 관련 설정
}));
app.use('/profile-images', express.static(path.join(__dirname, 'profile-images')));

// 포트 번호 1035로 연결
app.listen(1035, () => {
    console.log('Backend server is running!');
    });