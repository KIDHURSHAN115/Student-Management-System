const express = require('express');
const router = express.Router();
const {
  getAllGrades,
  createOrUpdateGrade,
  getStudentGrades,
} = require('../controllers/gradeController');
const { authenticate, authorize } = require('../middleware/auth');

// @route   GET /api/grades
// @desc    Get all grades
// @access  Private
router.get('/', authenticate, getAllGrades);

// @route   POST /api/grades
// @desc    Create/Update grades
// @access  Private/Lecturer
router.post('/', authenticate, authorize(['lecturer', 'admin']), createOrUpdateGrade);

// @route   GET /api/grades/student/:studentId
// @desc    Get grades for a specific student
// @access  Private
router.get('/student/:studentId', authenticate, getStudentGrades);

module.exports = router;
