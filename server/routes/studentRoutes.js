const express = require('express');
const { handleStudentLogin } = require('../controllers/studentController');
const router = express.Router();

router.post('/student-login', handleStudentLogin);

module.exports = router;
