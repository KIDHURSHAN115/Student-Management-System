const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');

// @route   GET /api/students
// @desc    Get all students (with search/filter)
// @access  Private
router.get('/', authenticate, async (req, res) => {
  try {
    const { studentId, courseId, currentSemester, name, email } = req.query;

    const query = {};
    if (studentId) query.studentId = { $regex: studentId, $options: 'i' };
    if (courseId) query.courseId = courseId;
    if (currentSemester) query.currentSemester = +currentSemester;

    if (name || email) {
      const userQuery = {};
      if (name) userQuery.name = { $regex: name, $options: 'i' };
      if (email) userQuery.email = { $regex: email, $options: 'i' };
      const matchedUsers = await User.find(userQuery).select('_id');
      const userIds = matchedUsers.map((u) => u._id);
      query.userId = { $in: userIds };
    }

    const students = await Student.find(query)
      .populate('userId', 'name email')
      .populate('courseId', 'courseName');

    res.status(200).json({
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
router.get('/:id', authenticate, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('courseId', 'courseName');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/students
// @desc    Create a new student
// @access  Private/Admin
router.post('/', authenticate, authorize(['admin', 'lecturer']), async (req, res) => {
  try {
    const { userId, studentId, dateOfBirth, gender, courseId } = req.body;

    if (!userId || !studentId) {
      return res.status(400).json({ message: 'Please provide userId and studentId' });
    }

    const student = new Student({
      userId,
      studentId,
      dateOfBirth,
      gender,
      courseId,
    });

    await student.save();
    await student.populate('userId', 'name email');

    res.status(201).json({
      message: 'Student created successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/students/:id
// @desc    Update student
// @access  Private/Admin
router.put('/:id', authenticate, authorize(['admin', 'lecturer']), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete student
// @access  Private/Admin
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
