const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

// .env 파일을 불러옴
dotenv.config();

// Mongo DB 연결
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Mongo DB connected!');
    })
    .catch((error) => {
        console.log(error);
    });

// 포트 번호 1035로 연결
app.listen(1035, () => {
    console.log('Backend server is running!');
    });