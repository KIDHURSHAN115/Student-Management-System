const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/auth');

// @route   GET /api/courses
// @desc    Get all courses
// @access  Private
router.get('/', authenticate, getAllCourses);

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private/Admin
router.post('/', authenticate, authorize(['admin']), createCourse);

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private/Admin
router.put('/:id', authenticate, authorize(['admin']), updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private/Admin
router.delete('/:id', authenticate, authorize(['admin']), deleteCourse);

module.exports = router;
