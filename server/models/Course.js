const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, 'Please add a course name'],
      trim: true,
    },
    courseCode: {
      type: String,
      unique: true,
      required: true,
    },
    credits: {
      type: Number,
      default: 3,
    },
    description: {
      type: String,
    },
    lecturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    semester: {
      type: Number,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
