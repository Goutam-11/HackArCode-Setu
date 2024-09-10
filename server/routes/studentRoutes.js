const express = require('express');
const { handleStudentLogin, fetchStudents } = require('../controllers/studentController');
const router = express.Router();

router.post('/student-login', handleStudentLogin);
router.get('/students', fetchStudents); // Add this route

module.exports = router;
