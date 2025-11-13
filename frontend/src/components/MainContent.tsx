import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MainContent.css'

const MainContent: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="main-content">
      <div className="content-header">
        <h1>Welcome to College Student Management System</h1>
        <p>Manage students, attendance, grades, and courses efficiently</p>
      </div>
      
      <div className="content-body">
        <div className="dashboard-cards">
          <div className="dashboard-card" onClick={() => navigate('/students')}>
            <div className="card-icon students">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Students</h3>
              <p>Manage student records and information</p>
            </div>
          </div>
          
          <div className="dashboard-card" onClick={() => navigate('/attendance')}>
            <div className="card-icon attendance">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Attendance</h3>
              <p>Track and manage student attendance</p>
            </div>
          </div>
          
          <div className="dashboard-card" onClick={() => navigate('/grades')}>
            <div className="card-icon grades">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Grades</h3>
              <p>Record and analyze student grades</p>
            </div>
          </div>
          
          <div className="dashboard-card" onClick={() => navigate('/courses')}>
            <div className="card-icon courses">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Courses</h3>
              <p>Manage course information and schedules</p>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button 
              className="action-btn primary"
              onClick={() => navigate('/students/register')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add New Student
            </button>
            <button 
              className="action-btn primary"
              onClick={() => navigate('/students')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              View Students
            </button>
            <button className="action-btn secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export Data
            </button>
            <button className="action-btn secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent
