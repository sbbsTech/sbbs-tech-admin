import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Attendance.css'

const Attendance: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </button>
        <h1>Attendance Management</h1>
        <p>Track and manage student attendance records</p>
      </div>

      <div className="attendance-content">
        <div className="attendance-cards">
          <div className="attendance-action-card mark" onClick={() => navigate('/attendance/mark')}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <h3>Mark Attendance</h3>
            <p>Record attendance for students by class or date</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>

          <div className="attendance-action-card view" onClick={() => navigate('/attendance/view')}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h3>View Attendance Records</h3>
            <p>Browse and analyze attendance history and reports</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>

          <div className="attendance-action-card reports" onClick={() => navigate('/attendance/reports')}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h3>Attendance Reports</h3>
            <p>Generate detailed attendance reports and analytics</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="attendance-stats-section">
          <div className="stats-header">
            <h2>Attendance Overview</h2>
            <p>Quick statistics and insights</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon present">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>85%</h3>
                <p>Overall Attendance</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon absent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>45</h3>
                <p>Absent Today</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon late">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>12</h3>
                <p>Late Arrivals</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon total">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>423</h3>
                <p>Total Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance
