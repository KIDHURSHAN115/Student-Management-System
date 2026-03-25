# Frontend Documentation

## Project Structure

```
frontend/
├── public/
│   └── index.html               # Main HTML file
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx        # Login page component
│   │   ├── RegisterPage.jsx     # Registration page component
│   │   └── DashboardPage.jsx    # Dashboard page component
│   ├── components/
│   │   └── ProtectedRoute.jsx   # Route protection component
│   ├── services/
│   │   └── apiService.js        # API service with axios
│   ├── styles/
│   │   └── (CSS files)
│   ├── App.jsx                  # Main app component with routing
│   ├── index.jsx                # React entry point
│   └── index.css
├── package.json                 # Dependencies
└── README.md                    # Frontend documentation
```

## Installation

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

App opens at `http://localhost:3000`

## Available Scripts

### `npm start`
Runs the app in development mode

### `npm build`
Builds the app for production

### `npm test`
Launches the test runner

## Pages

### LoginPage (`/login`)
- Email and password login form
- JWT token stored in localStorage
- Redirects to dashboard on successful login
- Link to register page

### RegisterPage (`/register`)
- Full name, email, password registration
- Role selection (student, lecturer, admin)
- Phone number (optional)
- Password confirmation
- Redirects to dashboard on successful registration

### DashboardPage (`/dashboard`, Protected)
- Welcome message with user name and role
- Student statistics card
- Student list in table format
- Add student functionality (Admin/Lecturer only)
- Logout button
- Dialog modal for adding new students

## Components

### ProtectedRoute
- Checks for JWT token in localStorage
- Redirects to login if token not found
- Wraps protected pages to ensure authentication

## Services

### apiService.js
Provides centralized API calls with axios:

**Auth Service**
- `register(data)` - Register new user
- `login(data)` - Login user

**Student Service**
- `getAll()` - Get all students
- `getById(id)` - Get specific student
- `create(data)` - Create new student
- `update(id, data)` - Update student
- `delete(id)` - Delete student

**Course Service**
- `getAll()` - Get all courses
- `create(data)` - Create course
- `update(id, data)` - Update course
- `delete(id)` - Delete course

**Attendance Service**
- `getAll()` - Get all attendance records
- `mark(data)` - Mark attendance
- `getByStudent(studentId)` - Get student attendance

**Grade Service**
- `getAll()` - Get all grades
- `create(data)` - Create/update grades
- `getByStudent(studentId)` - Get student grades

## Technologies Used

- **React** - UI framework
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **JavaScript (ES6+)** - Programming language

## Styling

Uses Material-UI (MUI) for all styling:
- Theme configuration with primary and secondary colors
- Responsive components
- Grid layout system
- Form components with validation

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in all protected API requests
5. Logout removes token from localStorage

## Features

- ✓ User registration and login
- ✓ Protected routes with authentication check
- ✓ Student management dashboard
- ✓ Add new students (Admin/Lecturer only)
- ✓ View student list
- ✓ Role-based UI (admin/lecturer/student)
- ✓ Responsive design
- ✓ Error handling and alerts
- ✓ Loading states

## Future Enhancements

- Student detail view page
- Course management page
- Attendance tracking page
- Grade management page
- Profile page
- Search and filter functionality
- Pagination for student list
- Student edit/delete functionality
- Dashboard analytics
