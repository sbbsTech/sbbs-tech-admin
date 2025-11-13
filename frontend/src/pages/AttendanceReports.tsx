import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import './AttendanceReports.css'

const AttendanceReports: React.FC = () => {
  const navigate = useNavigate()
  const [reportType, setReportType] = useState('overview')

  const dailyData = [
    { date: '2024-01-15', present: 380, absent: 45, late: 12, excused: 8 },
    { date: '2024-01-16', present: 395, absent: 30, late: 10, excused: 5 },
    { date: '2024-01-17', present: 388, absent: 38, late: 15, excused: 9 },
    { date: '2024-01-18', present: 400, absent: 25, late: 8, excused: 7 },
    { date: '2024-01-19', present: 392, absent: 33, late: 11, excused: 4 },
  ]

  const statusData = [
    { name: 'Present', value: 1955, color: '#10b981' },
    { name: 'Absent', value: 171, color: '#ef4444' },
    { name: 'Late', value: 56, color: '#f59e0b' },
    { name: 'Excused', value: 33, color: '#6366f1' },
  ]

  const classData = [
    { class: '1st Year', attendance: 88 },
    { class: '2nd Year', attendance: 92 },
    { class: '3rd Year', attendance: 85 },
    { class: '4th Year', attendance: 90 },
    { class: 'Graduate', attendance: 87 },
  ]

  return (
    <div className="attendance-reports-page">
      <div className="reports-header">
        <button className="back-button" onClick={() => navigate('/attendance')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Attendance Reports</h1>
        <p>Comprehensive attendance analytics and insights</p>
      </div>

      <div className="reports-content">
        <div className="report-tabs">
          <button
            className={`tab-btn ${reportType === 'overview' ? 'active' : ''}`}
            onClick={() => setReportType('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${reportType === 'daily' ? 'active' : ''}`}
            onClick={() => setReportType('daily')}
          >
            Daily Trends
          </button>
          <button
            className={`tab-btn ${reportType === 'class' ? 'active' : ''}`}
            onClick={() => setReportType('class')}
          >
            By Class
          </button>
        </div>

        {reportType === 'overview' && (
          <div className="report-section">
            <h2>Attendance Overview</h2>
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="stats-summary">
                <div className="stat-item">
                  <div className="stat-value">88.5%</div>
                  <div className="stat-label">Overall Attendance Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">1,955</div>
                  <div className="stat-label">Total Present</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">171</div>
                  <div className="stat-label">Total Absent</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">56</div>
                  <div className="stat-label">Late Arrivals</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'daily' && (
          <div className="report-section">
            <h2>Daily Attendance Trends</h2>
            <div className="chart-card">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="late" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="excused" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {reportType === 'class' && (
          <div className="report-section">
            <h2>Attendance by Class</h2>
            <div className="chart-card">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={classData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="class" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="url(#classGradient)" radius={[8, 8, 0, 0]}>
                    {classData.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="classGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f093fb" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#f5576c" stopOpacity={1}/>
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

export default AttendanceReports
