import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import './GradeReports.css'

const GradeReports: React.FC = () => {
  const navigate = useNavigate()
  const [reportType, setReportType] = useState('overview')

  const gradeDistribution = [
    { name: 'A', value: 156, color: '#10b981' },
    { name: 'B', value: 142, color: '#3b82f6' },
    { name: 'C', value: 98, color: '#f59e0b' },
    { name: 'D', value: 45, color: '#f97316' },
    { name: 'F', value: 12, color: '#ef4444' },
  ]

  const coursePerformance = [
    { course: 'Mathematics 101', avgGrade: 3.8, students: 45 },
    { course: 'Physics 201', avgGrade: 3.6, students: 38 },
    { course: 'Chemistry 301', avgGrade: 3.9, students: 42 },
    { course: 'Biology 201', avgGrade: 3.7, students: 40 },
  ]

  const classPerformance = [
    { class: '1st Year', avgGPA: 3.6 },
    { class: '2nd Year', avgGPA: 3.8 },
    { class: '3rd Year', avgGPA: 3.7 },
    { class: '4th Year', avgGPA: 3.9 },
    { class: 'Graduate', avgGPA: 3.8 },
  ]

  return (
    <div className="grade-reports-page">
      <div className="reports-header">
        <button className="back-button" onClick={() => navigate('/grades')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Grade Reports</h1>
        <p>Comprehensive grade analytics and performance insights</p>
      </div>

      <div className="reports-content">
        <div className="report-tabs">
          <button className={`tab-btn ${reportType === 'overview' ? 'active' : ''}`} onClick={() => setReportType('overview')}>
            Overview
          </button>
          <button className={`tab-btn ${reportType === 'courses' ? 'active' : ''}`} onClick={() => setReportType('courses')}>
            By Course
          </button>
          <button className={`tab-btn ${reportType === 'class' ? 'active' : ''}`} onClick={() => setReportType('class')}>
            By Class
          </button>
        </div>

        {reportType === 'overview' && (
          <div className="report-section">
            <h2>Grade Distribution</h2>
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Grade Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="stats-summary">
                <div className="stat-item">
                  <div className="stat-value">3.8</div>
                  <div className="stat-label">Average GPA</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">92%</div>
                  <div className="stat-label">Pass Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">156</div>
                  <div className="stat-label">A Grades</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">12</div>
                  <div className="stat-label">F Grades</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'courses' && (
          <div className="report-section">
            <h2>Course Performance</h2>
            <div className="chart-card">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={coursePerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="course" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgGrade" fill="#4facfe" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {reportType === 'class' && (
          <div className="report-section">
            <h2>Class Performance</h2>
            <div className="chart-card">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={classPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="class" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="avgGPA" fill="url(#gpaGradient)" radius={[8, 8, 0, 0]}>
                    {classPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#667eea" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#764ba2" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="export-section">
          <button className="export-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default GradeReports
