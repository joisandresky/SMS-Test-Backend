// this files is contains routes definition for course

const express = require('express');
const router = express.Router();
const controller = require('./course.controller')

router.get('/', controller.index)

module.exports = router