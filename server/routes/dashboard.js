const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');
const Grade = require('../models/Grade');
const { authenticate } = require('../middleware/auth');

// @route   GET /api/dashboard/stats
// @desc    Get key dashboard statistics
// @access  Private
router.get('/stats', authenticate, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalAttendance = await Attendance.countDocuments();
    const totalGrades = await Grade.countDocuments();

    const allAttendance = await Attendance.find();
    const presentCount = allAttendance.filter((a) => a.status === 'present').length;
    const attendanceRate = allAttendance.length ? Number(((presentCount / allAttendance.length) * 100).toFixed(2)) : 0;

    const allGrades = await Grade.find();
    const averageGpa = allGrades.length ? Number((allGrades.reduce((sum, g) => sum + g.gpa, 0) / allGrades.length).toFixed(2)) : 0;
    const gradeDistribution = allGrades.reduce((dist, g) => {
      dist[g.grade] = (dist[g.grade] || 0) + 1;
      return dist;
    }, {});

    res.status(200).json({
      totalStudents,
      totalCourses,
      totalAttendance,
      totalGrades,
      attendanceRate,
      averageGpa,
      gradeDistribution,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
