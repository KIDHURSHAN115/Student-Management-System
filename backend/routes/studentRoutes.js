const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { authenticate, authorize } = require('../middleware/auth');

// @route   GET /api/students
// @desc    Get all students
// @access  Private
router.get('/', authenticate, getAllStudents);

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
router.get('/:id', authenticate, getStudentById);

// @route   POST /api/students
// @desc    Create a new student
// @access  Private/Admin
router.post('/', authenticate, authorize(['admin', 'lecturer']), createStudent);

// @route   PUT /api/students/:id
// @desc    Update student
// @access  Private/Admin
router.put('/:id', authenticate, authorize(['admin', 'lecturer']), updateStudent);

// @route   DELETE /api/students/:id
// @desc    Delete student
// @access  Private/Admin
router.delete('/:id', authenticate, authorize(['admin']), deleteStudent);

module.exports = router;
