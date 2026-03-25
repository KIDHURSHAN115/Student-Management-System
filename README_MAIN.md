# Smart Student Management System
## MERN Stack Web Application

A comprehensive web-based application for managing student data, attendance, and academic performance using **MongoDB, Express, React, and Node.js**.

---

## 📁 Project Structure Overview

```
smart-student-management-system/
│
├── 📂 FRONTEND/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── apiService.js
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── package.json
│   └── README.md
│
├── 📂 BACKEND/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Course.js
│   │   ├── Attendance.js
│   │   └── Grade.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── courseController.js
│   │   ├── attendanceController.js
│   │   └── gradeController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── attendanceRoutes.js
│   │   └── gradeRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── jwt.js
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   ├── package.json
│   ├── README.md
│   └── API_ENDPOINTS.md
│
├── .github/
│   └── copilot-instructions.md
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with:
# MONGO_URI=mongodb://localhost:27017/ssms
# JWT_SECRET=your_super_secret_jwt_key
# PORT=5000
# NODE_ENV=development

# Start server
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React app
npm start
# App opens at http://localhost:3000
```

---

## 📋 Core Features

### 1. User Management
- ✅ **User Registration** - Create new accounts with email
- ✅ **User Login** - Secure JWT-based authentication
- ✅ **Role-Based Access** - Admin, Lecturer, Student roles
- ✅ **Profile Management** - View user information

### 2. Student Management
- ✅ **Student CRUD** - Create, read, update, delete students
- ✅ **Student Records** - Store complete student information
- ✅ **Search Functionality** - Find students quickly
- ✅ **Course Enrollment** - Track student course enrollment

### 3. Course Management
- ✅ **Course Creation** - Create and manage courses
- ✅ **Course Assignment** - Assign lecturers to courses
- ✅ **Student Enrollment** - Enroll students in courses
- ✅ **Course Details** - Course code, credits, semester

### 4. Attendance System
- ✅ **Mark Attendance** - Present/Absent/Late/Excused status
- ✅ **Attendance Records** - Track daily attendance records
- ✅ **Student Attendance** - View individual student records
- ✅ **Reports** - Generate attendance statistics

### 5. Grade Management
- ✅ **Grade Entry** - Enter assignment, midterm, final grades
- ✅ **Automatic Calculation** - Calculate total marks and GPA
- ✅ **Grade Letters** - A, B, C, D, F grading system
- ✅ **GPA Tracking** - 4.0 scale GPA calculation

### 6. Dashboard & Analytics
- ✅ **Student Statistics** - Total student count display
- ✅ **Welcome Screen** - User role display and info
- ✅ **Data Tables** - Organized data presentation
- ✅ **Quick Actions** - Add students, mark attendance

---

## 🔐 Authentication & Authorization

### JWT Implementation
- Tokens expire in 7 days
- Secure password hashing with bcryptjs
- Token stored in localStorage
- Bearer token in request headers

### Role-Based Access Control
```
ADMIN       → Full system access
LECTURER    → Manage students, mark attendance, enter grades
STUDENT     → View own profile, grades, attendance
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Material-UI (MUI) | Component Library |
| React Router | Client Routing |
| Axios | HTTP Client |
| JavaScript ES6+ | Programming Language |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | NoSQL Database |
| JWT | Authentication |
| Bcryptjs | Password Hashing |
| Mongoose | ODM Library |

### Tools
| Tool | Usage |
|---|---|
| Git | Version Control |
| Postman | API Testing |
| VS Code | Code Editor |

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
```

### Students
```
GET    /api/students         - Get all students
GET    /api/students/:id     - Get student by ID
POST   /api/students         - Create student (Admin)
PUT    /api/students/:id     - Update student (Admin)
DELETE /api/students/:id     - Delete student (Admin)
```

### Courses
```
GET    /api/courses          - Get all courses
POST   /api/courses          - Create course (Admin)
PUT    /api/courses/:id      - Update course (Admin)
DELETE /api/courses/:id      - Delete course (Admin)
```

### Attendance
```
GET    /api/attendance       - Get all attendance
POST   /api/attendance/mark  - Mark attendance (Lecturer)
GET    /api/attendance/student/:studentId - Get student attendance
```

### Grades
```
GET    /api/grades           - Get all grades
POST   /api/grades           - Create/Update grades (Lecturer)
GET    /api/grades/student/:studentId - Get student grades
```

For detailed API documentation, see [Backend API_ENDPOINTS.md](./backend/API_ENDPOINTS.md)

---

## 📚 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/lecturer/student),
  phoneNumber: String,
  isActive: Boolean,
  timestamps
}
```

### Students Collection
```javascript
{
  userId: ObjectId (ref: User),
  studentId: String (unique),
  dateOfBirth: Date,
  gender: String,
  enrollmentDate: Date,
  currentSemester: Number,
  courseId: ObjectId (ref: Course),
  timestamps
}
```

### Grades Collection
```javascript
{
  studentId: ObjectId (ref: Student),
  courseId: ObjectId (ref: Course),
  assignment: Number,
  midterm: Number,
  final: Number,
  totalMarks: Number (calculated),
  grade: String (A/B/C/D/F),
  gpa: Number (0-4.0),
  timestamps
}
```

---

## 🧪 Testing the Application

### Using Postman
1. Import API endpoints from API_ENDPOINTS.md
2. Register a new user
3. Login to get JWT token
4. Add token to Authorization header for protected routes
5. Test CRUD operations

### Sample Test Credentials
```
Email: admin@ssms.com
Password: admin123
Role: Admin
```

---

## ⚙️ Configuration

### Environment Variables (Backend)
```env
MONGO_URI=mongodb://localhost:27017/ssms
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### Frontend Configuration
- API Base URL: http://localhost:5000/api
- Auto-configured in proxy setting in package.json

---

## 📖 Documentation

- **[Backend Documentation](./backend/README.md)** - Backend setup and features
- **[Frontend Documentation](./frontend/README.md)** - Frontend setup and pages
- **[API Endpoints](./backend/API_ENDPOINTS.md)** - Complete API documentation

---

## 🐛 Troubleshooting

### Common Issues & Solutions

**MongoDB Connection Error**
- Ensure MongoDB is running on localhost:27017
- Check MONGO_URI in .env matches your setup

**CORS Errors**
- Verify backend is running on port 5000
- Check frontend proxy in package.json

**Port Already in Use**
- Change PORT in .env file
- Or kill process: `netstat -ano | findstr :5000`

**Authentication Issues**
- Clear localStorage in browser
- Check JWT_SECRET consistency
- Verify token in Authorization header

---

## 🚀 Deployment

### Backend (Node.js)
- Deploy to Heroku, AWS, or DigitalOcean
- Set environment variables in hosting platform
- Ensure MongoDB connection string is set

### Frontend (React)
- Build: `npm run build`
- Deploy to Vercel, Netlify, or GitHub Pages
- Update API URL for production

---

## 📈 Future Enhancements

1. **Email Notifications** - Attendance and grade alerts
2. **SMS Integration** - Text message notifications
3. **Advanced Analytics** - Performance dashboards
4. **Mobile App** - React Native version
5. **File Uploads** - Document and photo uploads
6. **Export Reports** - PDF and Excel generation
7. **Calendar Integration** - Schedule management
8. **Biometric Attendance** - Fingerprint/Face recognition

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👥 Contributors

- Developed as a MERN Stack educational project
- Ready for customization and extension

---

## 📞 Support

For issues, bugs, or questions:
1. Check existing documentation
2. Review API endpoints
3. Check console logs and error messages
4. Consult troubleshooting section

---

**Version:** 1.0.0  
**Last Updated:** March 2026  
**Status:** ✅ Active Development
