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

// @route   GET /api/attendance/report
// @desc    Get attendance report and summary
// @access  Private
router.get('/report', authenticate, async (req, res) => {
  try {
    const { studentId, courseId, startDate, endDate } = req.query;
    const query = {};
    if (studentId) query.studentId = studentId;
    if (courseId) query.courseId = courseId;
    if (startDate || endDate) query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);

    const records = await Attendance.find(query).populate('studentId', 'studentId').populate('courseId', 'courseName');
    const total = records.length;
    const present = records.filter((r) => r.status === 'present').length;
    const absent = records.filter((r) => r.status === 'absent').length;
    const late = records.filter((r) => r.status === 'late').length;
    const excused = records.filter((r) => r.status === 'excused').length;
    const percentage = total ? ((present / total) * 100).toFixed(2) : 0;

    res.status(200).json({
      total,
      present,
      absent,
      late,
      excused,
      attendancePercentage: Number(percentage),
      data: records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/attendance/percentage/student/:studentId
// @desc    Get attendance percentage for specific student
// @access  Private
router.get('/percentage/student/:studentId', authenticate, async (req, res) => {
  try {
    const records = await Attendance.find({ studentId: req.params.studentId });
    if (records.length === 0) {
      return res.status(404).json({ message: 'No attendance records found' });
    }

    const total = records.length;
    const present = records.filter((r) => r.status === 'present').length;
    const attendancePercentage = Number(((present / total) * 100).toFixed(2));

    res.status(200).json({
      studentId: req.params.studentId,
      total,
      present,
      attendancePercentage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
