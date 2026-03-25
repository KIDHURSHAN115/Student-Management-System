const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { authenticate, authorize } = require('../middleware/auth');

// @route   GET /api/courses
// @desc    Get all courses
// @access  Private
router.get('/', authenticate, async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('lecturerId', 'name email')
      .populate('enrolledStudents', 'name');

    res.status(200).json({
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private/Admin
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { courseName, courseCode, credits, description, lecturerId, semester } = req.body;

    if (!courseName || !courseCode) {
      return res.status(400).json({ message: 'Please provide courseName and courseCode' });
    }

    const course = new Course({
      courseName,
      courseCode,
      credits,
      description,
      lecturerId,
      semester,
    });

    await course.save();
    await course.populate('lecturerId', 'name email');

    res.status(201).json({
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private/Admin
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('lecturerId', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: 'Course updated successfully',
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private/Admin
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
