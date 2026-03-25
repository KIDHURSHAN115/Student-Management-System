const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { authenticate, authorize } = require('../middleware/auth');

// @route   GET /api/attendance
// @desc    Get all attendance records
// @access  Private
router.get('/', authenticate, async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate('studentId', 'name')
      .populate('courseId', 'courseName');

    res.status(200).json({
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/attendance/mark
// @desc    Mark attendance
// @access  Private/Lecturer
router.post('/mark', authenticate, authorize(['lecturer', 'admin']), async (req, res) => {
  try {
    const { studentId, courseId, date, status, remarks } = req.body;

    if (!studentId || !courseId || !date || !status) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const attendance = new Attendance({
      studentId,
      courseId,
      date,
      status,
      remarks,
    });

    await attendance.save();
    await attendance.populate('studentId', 'name').populate('courseId', 'courseName');

    res.status(201).json({
      message: 'Attendance marked successfully',
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/attendance/student/:studentId
// @desc    Get attendance for a specific student
// @access  Private
router.get('/student/:studentId', authenticate, async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.params.studentId })
      .populate('courseId', 'courseName');

    if (attendance.length === 0) {
      return res.status(404).json({ message: 'No attendance records found' });
    }

    res.status(200).json({
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
