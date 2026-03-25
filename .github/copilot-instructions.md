# Smart Student Management System - MERN Stack

## Project Overview
A full-stack web application for managing student data, attendance, and performance analytics using MERN (MongoDB, Express, React, Node.js).

## Architecture
- **Frontend**: React.js with Material-UI
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Setup Instructions

### 1. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration
Create `.env` file in server directory with:
```
MONGO_URI=mongodb://localhost:27017/ssms
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### 3. Start Development Servers
```bash
# Terminal 1: Start backend (from server folder)
npm start

# Terminal 2: Start frontend (from client folder)
npm start
```

### 4. Project Structure
- `/server` - Express backend API
- `/client` - React frontend application
- `/server/models` - MongoDB schemas
- `/server/routes` - API endpoints
- `/client/src/components` - React components

## Key Features Implemented
1. User Authentication (Login/Registration)
2. JWT-based authorization
3. Student CRUD operations
4. Attendance tracking
5. Grade management
6. Dashboard with analytics

## Database Models
- Users (Admin, Lecturer, Student)
- Students
- Courses
- Attendance
- Grades

## API Endpoints
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/students` - Get all students
- POST `/api/attendance/mark` - Mark attendance
- GET `/api/grades` - Get student grades

## Development Notes
- Use Postman for API testing
- Access React app at http://localhost:3000
- Access API at http://localhost:5000
- MongoDB should be running locally on default port 27017
