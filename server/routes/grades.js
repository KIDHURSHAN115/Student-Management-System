const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const { authenticate, authorize } = require('../middleware/auth');

// @route   GET /api/grades
// @desc    Get all grades
// @access  Private
router.get('/', authenticate, async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate('studentId', 'name')
      .populate('courseId', 'courseName');

    res.status(200).json({
      count: grades.length,
      data: grades,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/grades
// @desc    Create/Update grades
// @access  Private/Lecturer
router.post('/', authenticate, authorize(['lecturer', 'admin']), async (req, res) => {
  try {
    const { studentId, courseId, assignment, midterm, final } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ message: 'Please provide studentId and courseId' });
    }

    let grade = await Grade.findOne({ studentId, courseId });

    if (grade) {
      // Update existing grade
      grade.assignment = assignment || grade.assignment;
      grade.midterm = midterm || grade.midterm;
      grade.final = final || grade.final;
      await grade.save();
    } else {
      // Create new grade
      grade = new Grade({
        studentId,
        courseId,
        assignment,
        midterm,
        final,
      });
      await grade.save();
    }

    await grade.populate('studentId', 'name').populate('courseId', 'courseName');

    res.status(201).json({
      message: 'Grade saved successfully',
      data: grade,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/grades/student/:studentId
// @desc    Get grades for a specific student
// @access  Private
router.get('/student/:studentId', authenticate, async (req, res) => {
  try {
    const grades = await Grade.find({ studentId: req.params.studentId })
      .populate('courseId', 'courseName');

    if (grades.length === 0) {
      return res.status(404).json({ message: 'No grades found' });
    }

    res.status(200).json({
      count: grades.length,
      data: grades,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
