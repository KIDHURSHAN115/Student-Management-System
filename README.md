# Smart Student Management System

A comprehensive MERN stack application for managing student data, attendance, and academic performance.

## Features

### User Management
- **Authentication**: JWT-based login/registration system
- **Role-Based Access Control**: Admin, Lecturer, and Student roles
- **User Profiles**: Name, email, phone, and role management

### Student Management
- Complete CRUD operations for student records
- Student enrollment tracking
- Student profile management with personal details
- Course enrollment

### Attendance Management
- Mark daily attendance (Present, Absent, Late, Excused)
- Attendance tracking by course and student
- Attendance reports and statistics

### Grade Management
- Assignment, midterm, and final exam grading
- Automatic GPA calculation
- Grade letter system (A, B, C, D, F)
- Grade reports by student and course

### Course Management
- Create and manage courses
- Assign lecturers to courses
- Student enrollment in courses
- Course-based filtering

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Material-UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing

## Project Structure

```
smart-student-management-system/
├── server/                      # Backend API
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Student.js          # Student schema
│   │   ├── Course.js           # Course schema
│   │   ├── Attendance.js       # Attendance schema
│   │   └── Grade.js            # Grade schema
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   ├── students.js         # Student routes
│   │   ├── courses.js          # Course routes
│   │   ├── attendance.js       # Attendance routes
│   │   └── grades.js           # Grade routes
│   ├── middleware/
│   │   └── auth.js             # Authentication middleware
│   ├── utils/
│   │   └── jwt.js              # JWT utilities
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server file
│   └── package.json
│
├── client/                      # Frontend React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx       # Login page
│   │   │   ├── Register.jsx    # Registration page
│   │   │   └── Dashboard.jsx   # Dashboard page
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── App.jsx             # Main app component
│   │   ├── index.jsx           # React entry point
│   │   └── index.css
│   └── package.json
│
├── .github/
│   └── copilot-instructions.md # Project documentation
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017 or update connection string)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```
   MONGO_URI=mongodb://localhost:27017/ssms
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```
   App opens at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student (Admin/Lecturer)
- `PUT /api/students/:id` - Update student (Admin/Lecturer)
- `DELETE /api/students/:id` - Delete student (Admin)

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Attendance
- `GET /api/attendance` - Get all attendance records
- `POST /api/attendance/mark` - Mark attendance (Lecturer/Admin)
- `GET /api/attendance/student/:studentId` - Get student attendance

### Grades
- `GET /api/grades` - Get all grades
- `POST /api/grades` - Create/Update grades (Lecturer/Admin)
- `GET /api/grades/student/:studentId` - Get student grades

## Authentication

The application uses JWT tokens for authentication:
1. Register or login to receive a token
2. Include token in requests: `Authorization: Bearer <token>`
3. Tokens expire in 7 days

## User Roles & Permissions

### Admin
- Full system access
- Manage users, students, courses
- Create and delete records

### Lecturer
- View students and grades
- Mark attendance
- Enter and manage grades
- View reports

### Student
- View own profile and grades
- View own attendance
- View own course enrollment

## Development

### Testing API Endpoints
Use Postman to test endpoints:
1. Import endpoints as shown in API Endpoints section
2. Add Authorization header with Bearer token for protected routes
3. Test CRUD operations

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running locally
- Check MONGO_URI in .env matches your MongoDB instance

**CORS Errors**
- Make sure backend is running on port 5000
- Frontend proxy is set to `http://localhost:5000` in package.json

**Port Already in Use**
- Kill process on port 5000/3000 or change PORT in .env

## Future Enhancements

1. **Email Notifications** - Attendance/grade notifications
2. **SMS Alerts** - Important announcements via SMS
3. **Analytics Dashboard** - Advanced performance metrics
4. **Mobile App** - React Native mobile version
5. **Cloud Deployment** - AWS/Heroku deployment
6. **Advanced Filtering** - Search and filter capabilities
7. **Export Reports** - PDF/Excel report generation

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.

---

**Created**: March 2026
**Status**: Active Development
