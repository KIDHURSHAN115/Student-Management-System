BACKEND API ENDPOINTS
=====================

## AUTHENTICATION
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user

## STUDENTS
GET    /api/students            - Get all students (Protected)
GET    /api/students/:id        - Get student by ID (Protected)
POST   /api/students            - Create student (Protected/Admin)
PUT    /api/students/:id        - Update student (Protected/Admin)
DELETE /api/students/:id        - Delete student (Protected/Admin)

## COURSES
GET    /api/courses             - Get all courses (Protected)
POST   /api/courses             - Create course (Protected/Admin)
PUT    /api/courses/:id         - Update course (Protected/Admin)
DELETE /api/courses/:id         - Delete course (Protected/Admin)

## ATTENDANCE
GET    /api/attendance          - Get all attendance (Protected)
POST   /api/attendance/mark     - Mark attendance (Protected/Lecturer)
GET    /api/attendance/student/:studentId - Get student attendance (Protected)

## GRADES
GET    /api/grades              - Get all grades (Protected)
POST   /api/grades              - Create/Update grades (Protected/Lecturer)
GET    /api/grades/student/:studentId - Get student grades (Protected)

## HEALTH CHECK
GET    /api/health              - Server health check
