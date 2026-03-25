const express = require('express');
const router = express.Router();
const {
  getAllAttendance,
  markAttendance,
  getStudentAttendance,
} = require('../controllers/attendanceController');
const { authenticate, authorize } = require('../middleware/auth');

// @route   GET /api/attendance
// @desc    Get all attendance records
// @access  Private
router.get('/', authenticate, getAllAttendance);

// @route   POST /api/attendance/mark
// @desc    Mark attendance
// @access  Private/Lecturer
router.post('/mark', authenticate, authorize(['lecturer', 'admin']), markAttendance);

// @route   GET /api/attendance/student/:studentId
// @desc    Get attendance for a specific student
// @access  Private
router.get('/student/:studentId', authenticate, getStudentAttendance);

module.exports = router;
