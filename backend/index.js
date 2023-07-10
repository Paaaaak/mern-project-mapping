const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.listen(1035, () => {
    console.log('Backend server is running!');
});