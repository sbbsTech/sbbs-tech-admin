import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StudentProvider } from './context/StudentContext'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Students from './pages/Students'
import RegisterStudent from './pages/RegisterStudent'
import ViewStudents from './pages/ViewStudents'
import EditStudent from './pages/EditStudent'
import Attendance from './pages/Attendance'
import MarkAttendance from './pages/MarkAttendance'
import ViewAttendance from './pages/ViewAttendance'
import AttendanceReports from './pages/AttendanceReports'
import Grades from './pages/Grades'
import EnterGrades from './pages/EnterGrades'
import ViewGrades from './pages/ViewGrades'
import GradeReports from './pages/GradeReports'
import Courses from './pages/Courses'
import AddCourse from './pages/AddCourse'
import ViewCourses from './pages/ViewCourses'
import CourseSchedule from './pages/CourseSchedule'
import StudentEnrollment from './pages/StudentEnrollment'
import './App.css'

function App() {
  return (
    <StudentProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/register" element={<RegisterStudent />} />
            <Route path="/students/view" element={<ViewStudents />} />
            <Route path="/students/edit/:id" element={<EditStudent />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/mark" element={<MarkAttendance />} />
            <Route path="/attendance/view" element={<ViewAttendance />} />
            <Route path="/attendance/reports" element={<AttendanceReports />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/grades/enter" element={<EnterGrades />} />
            <Route path="/grades/view" element={<ViewGrades />} />
            <Route path="/grades/reports" element={<GradeReports />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/add" element={<AddCourse />} />
            <Route path="/courses/view" element={<ViewCourses />} />
            <Route path="/courses/schedule" element={<CourseSchedule />} />
            <Route path="/courses/enroll" element={<StudentEnrollment />} />
          </Routes>
        </div>
      </Router>
    </StudentProvider>
  )
}

export default App
