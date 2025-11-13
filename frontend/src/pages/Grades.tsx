import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Grades.css'

const Grades: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="grades-page">
      <div className="grades-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </button>
        <h1>Grades Management</h1>
        <p>Record and manage student grades and academic performance</p>
      </div>

      <div className="grades-content">
        <div className="grades-cards">
          <div className="grade-action-card enter" onClick={() => navigate('/grades/enter')}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <h3>Enter Grades</h3>
            <p>Record grades for assignments, exams, and assessments</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>

          <div className="grade-action-card view" onClick={() => navigate('/grades/view')}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h3>View Grades</h3>
            <p>Browse student grades and academic records</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>

          <div className="grade-action-card reports" onClick={() => navigate('/grades/reports')}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h3>Grade Reports</h3>
            <p>Generate comprehensive grade reports and transcripts</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="grades-stats-section">
          <div className="stats-header">
            <h2>Academic Performance Overview</h2>
            <p>Key metrics and statistics</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon average">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>3.8</h3>
                <p>Average GPA</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon excellent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>156</h3>
                <p>Students (A Grade)</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon passing">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>92%</h3>
                <p>Pass Rate</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon improvement">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
                  <polyline points="17,6 23,6 23,12"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3>+5.2%</h3>
                <p>Grade Improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Grades
