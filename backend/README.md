# Backend Documentation

## Project Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection setup
├── models/
│   ├── User.js                  # User schema (Admin, Lecturer, Student)
│   ├── Student.js               # Student schema
│   ├── Course.js                # Course schema
│   ├── Attendance.js            # Attendance schema
│   └── Grade.js                 # Grade schema
├── routes/
│   ├── authRoutes.js            # Authentication endpoints
│   ├── studentRoutes.js         # Student CRUD endpoints
│   ├── courseRoutes.js          # Course management endpoints
│   ├── attendanceRoutes.js      # Attendance tracking endpoints
│   └── gradeRoutes.js           # Grade management endpoints
├── controllers/
│   ├── authController.js        # Login/Register logic
│   ├── studentController.js     # Student operations logic
│   ├── courseController.js      # Course operations logic
│   ├── attendanceController.js  # Attendance operations logic
│   └── gradeController.js       # Grade operations logic
├── middleware/
│   └── auth.js                  # JWT authentication & authorization
├── utils/
│   └── jwt.js                   # JWT token generation & verification
├── .env                         # Environment variables
├── .env.example                 # Example environment file
├── server.js                    # Main server entry point
├── package.json                 # Dependencies
└── API_ENDPOINTS.md             # API documentation
```

## Installation

1. Navigate to backend folder:
```bash
cd backend
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

## Development Mode

To run in development mode with auto-reload:
```bash
npm run dev
```

## Database Models

### User Model
- id (ObjectId)
- name (String)
- email (String, unique)
- password (String, hashed with bcrypt)
- role (String: admin, lecturer, student)
- phoneNumber (String)
- isActive (Boolean)
- timestamps

### Student Model
- studentId (String, unique)
- userId (Reference to User)
- dateOfBirth (Date)
- gender (String: male, female, other)
- enrollmentDate (Date)
- currentSemester (Number)
- courseId (Reference to Course)
- address (String)
- parentContact (String)
- timestamps

### Course Model
- courseName (String)
- courseCode (String, unique)
- credits (Number)
- description (String)
- lecturerId (Reference to User)
- semester (Number)
- enrolledStudents (Array of References to Student)
- timestamps

### Attendance Model
- studentId (Reference to Student)
- courseId (Reference to Course)
- date (Date)
- status (String: present, absent, late, excused)
- remarks (String)
- timestamps

### Grade Model
- studentId (Reference to Student)
- courseId (Reference to Course)
- assignment (Number, 0-100)
- midterm (Number, 0-100)
- final (Number, 0-100)
- totalMarks (Number, calculated)
- grade (String: A, B, C, D, F)
- gpa (Number, 0-4.0)
- timestamps

## Authentication

Uses JWT (JSON Web Tokens) for authentication:
- Tokens expire in 7 days
- Include token in request header: `Authorization: Bearer <token>`
- Passwords are hashed with bcryptjs before storing

## API Endpoints

See [API_ENDPOINTS.md](./API_ENDPOINTS.md) for detailed endpoint documentation.

## Key Features

- **User Management**: Registration, login, role-based access
- **Student Management**: CRUD operations with course enrollment
- **Course Management**: Create, read, update, delete courses
- **Attendance Tracking**: Mark and view attendance records
- **Grade Management**: Store and calculate grades with GPA
- **Authorization**: Role-based access control for different operations

## Security

- JWT-based authentication
- Password hashing with bcryptjs
- CORS enabled
- Environment variable protection
- Input validation on all endpoints

## Error Handling

- Proper HTTP status codes
- Descriptive error messages
- Try-catch blocks for async operations
- MongoDB connection error handling
