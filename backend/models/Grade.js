const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    assignment: {
      type: Number,
      default: 0,
    },
    midterm: {
      type: Number,
      default: 0,
    },
    final: {
      type: Number,
      default: 0,
    },
    totalMarks: {
      type: Number,
      default: 0,
    },
    grade: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'F', 'N/A'],
      default: 'N/A',
    },
    gpa: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Calculate total marks and grade before saving
gradeSchema.pre('save', function (next) {
  this.totalMarks = (this.assignment * 0.2) + (this.midterm * 0.3) + (this.final * 0.5);

  if (this.totalMarks >= 90) {
    this.grade = 'A';
    this.gpa = 4.0;
  } else if (this.totalMarks >= 80) {
    this.grade = 'B';
    this.gpa = 3.0;
  } else if (this.totalMarks >= 70) {
    this.grade = 'C';
    this.gpa = 2.0;
  } else if (this.totalMarks >= 60) {
    this.grade = 'D';
    this.gpa = 1.0;
  } else {
    this.grade = 'F';
    this.gpa = 0.0;
  }

  next();
});

module.exports = mongoose.model('Grade', gradeSchema);
