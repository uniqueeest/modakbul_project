const express = require('express');
const bodyParser = require('body-parser');

const app = express ();

//bodyParser 미들웨어 등록
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;