import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Courses.css'

const Courses: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="courses-page">
      <div className="courses-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </button>
        <h1>Course Management</h1>
        <p>Manage courses, schedules, and curriculum information</p>
      </div>

      <div className="courses-content">
        <div className="courses-cards">
          <div className="course-action-card add" onClick={() => navigate('/courses/add')}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <h3>Add New Course</h3>
            <p>Create and register a new course in the system</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>

          <div className="course-action-card view" onClick={() => navigate('/courses/view')}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h3>View Courses</h3>
            <p>Browse all available courses and their details</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>

          <div className="course-action-card schedule" onClick={() => navigate('/courses/schedule')}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3>Course Schedule</h3>
            <p>Manage class schedules and timetables</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>

          <div className="course-action-card enroll" onClick={() => navigate('/courses/enroll')}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Student Enrollment</h3>
            <p>Enroll students in courses and manage registrations</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="courses-stats-section">
          <div className="stats-header">
            <h2>Course Overview</h2>
            <p>Academic program statistics and insights</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon total">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>48</h3>
                <p>Total Courses</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon active">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>42</h3>
                <p>Active Courses</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon enrolled">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>1,245</h3>
                <p>Total Enrollments</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon departments">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>12</h3>
                <p>Departments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
