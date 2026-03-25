const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentId: {
      type: String,
      unique: true,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    currentSemester: {
      type: Number,
      default: 1,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    address: {
      type: String,
    },
    parentContact: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
