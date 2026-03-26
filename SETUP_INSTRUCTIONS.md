# Smart Student Management System - Setup Instructions

## 🔧 Installation & Startup Guide

### Prerequisites
- Node.js (v14+)
- MongoDB (v4.4+) OR Docker

---

## 📦 MongoDB Setup

### Option 1: Local MongoDB Installation (Windows)

1. **Download MongoDB Community Edition**
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows
   - Download MSI installer

2. **Install MongoDB**
   - Run the installer
   - Choose "Install MongoDB as a Service" (recommended)
   - Complete installation

3. **Verify Installation**
   ```powershell
   mongod --version
   ```

4. **Start MongoDB Service**
   - Windows: Open Services.msc and start "MongoDB Server"
   - Or run in terminal:
   ```powershell
   mongod
   ```

### Option 2: MongoDB Atlas (Cloud - No Installation)

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Create free account
   - Create a cluster (free tier available)

2. **Get Connection String**
   - Copy the connection URI from Atlas dashboard
   - Update `.env` file in `/server`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ssms
   ```

### Option 3: Docker (Easiest)

1. **Install Docker**
   - Download from: https://www.docker.com/products/docker-desktop

2. **Run MongoDB Container**
   ```powershell
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

---

## 🚀 Starting the Application

### Terminal 1: Start Backend Server

```powershell
cd ".\smart student management system\server"
npm install    # First time only
npm start
```

✅ Backend should run on: `http://localhost:5000`

### Terminal 2: Start Frontend

```powershell
cd ".\smart student management system\frontend"
npm install    # First time only
npm start
```

✅ Frontend should run on: `http://localhost:3000` (or next available port)

---

## 🔗 Key Configuration Files

### Backend (`/server/.env`)
```
MONGO_URI=mongodb://localhost:27017/ssms
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### Frontend Proxy (`/frontend/package.json`)
```json
"proxy": "http://localhost:5000"
```

---

## ✅ Testing Registration

1. Go to: `http://localhost:3000` (or assigned port)
2. Click **"Create Account"**
3. Fill in the form:
   - Full Name
   - Email
   - Phone (optional)
   - Role (Student/Lecturer/Admin)
   - Password (min 6 chars)
4. Click **"Create Account"**
5. Should redirect to Dashboard after successful registration

---

## 🐛 Common Issues & Fixes

### Issue: "Registration Failed" or Proxy Error

**Solution:**
- Check if backend is running on port 5000
- Verify MongoDB is running
- Check console for specific error messages

### Issue: "MongoDB Connection Error"

**Solution:**
- Ensure MongoDB is running (see MongoDB Setup above)
- Verify connection URI in `.env` file
- Check firewall settings

### Issue: "Port Already in Use"

**Solution:**
- Kill the process on that port
- Or change port in `.env` (backend) or package.json (frontend proxy)

### Issue: Blank page or 404 errors

**Solution:**
- Clear browser cache
- Restart both servers
- Check browser console (F12) for JavaScript errors

---

## 📋 Project Structure

```
smart student management system/
├── server/                 # Express Backend API
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth & validation
│   ├── controllers/       # Business logic
│   ├── utils/             # Helper functions
│   ├── config/            # Database config
│   └── server.js          # Entry point
│
└── frontend/              # React Frontend
    ├── src/
    │   ├── pages/         # Page components
    │   ├── components/    # Reusable components
    │   ├── services/      # API calls
    │   ├── App.jsx        # Main app
    │   └── index.jsx      # Entry point
    └── package.json       # Dependencies & proxy
```

---

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `POST /api/courses/:id/enroll` - Enroll student
- `POST /api/courses/:id/unenroll` - Unenroll student

### Attendance
- `POST /api/attendance/mark` - Mark attendance
- `GET /api/attendance/student/:id` - Get student attendance
- `GET /api/attendance/report` - Get attendance report

### Grades
- `POST /api/grades` - Add grade
- `GET /api/grades/student/:id` - Get student grades
- `GET /api/grades/gpa/:id` - Calculate GPA
- `GET /api/grades/report/:id` - Generate report card

---

## 💡 Tips

- Use Postman for API testing
- Enable browser console (F12) for debugging
- Check `.env` file if connections fail
- MongoDB Atlas is great for cloud deployment

---

## 🆘 Need Help?

Check the error message in:
1. Browser console (F12)
2. Backend terminal output
3. MongoDB connection logs

If issues persist, restart both servers completely.
