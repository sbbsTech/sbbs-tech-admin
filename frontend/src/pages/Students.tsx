import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudents } from '../context/StudentContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import './Students.css'

const Students: React.FC = () => {
  const navigate = useNavigate()
  const { students } = useStudents()

  // Calculate class-wise student strength from actual data
  const classData = useMemo(() => {
    const yearCounts: { [key: string]: number } = {}
    
    students.forEach(student => {
      yearCounts[student.year] = (yearCounts[student.year] || 0) + 1
    })

    return [
      { class: '1st Year', students: yearCounts['1st Year'] || 0 },
      { class: '2nd Year', students: yearCounts['2nd Year'] || 0 },
      { class: '3rd Year', students: yearCounts['3rd Year'] || 0 },
      { class: '4th Year', students: yearCounts['4th Year'] || 0 },
      { class: 'Graduate', students: yearCounts['Graduate'] || 0 }
    ]
  }, [students])

  const handleRegisterClick = () => {
    navigate('/students/register')
  }

  const handleViewClick = () => {
    navigate('/students/view')
  }

  const handleBarClick = (data: { class: string; students: number }) => {
    // Navigate to view students with year filter pre-filled
    if (data && data.class) {
      const year = data.class
      navigate(`/students/view?year=${encodeURIComponent(year)}`)
    }
  }

  return (
    <div className="students-page">
      <div className="students-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </button>
        <h1>Student Management</h1>
        <p>Manage student records and information</p>
      </div>

      <div className="students-content">
        <div className="students-cards">
          <div className="student-action-card register" onClick={handleRegisterClick}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <h3>Register New Student</h3>
            <p>Add a new student to the system with their details</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>

          <div className="student-action-card view" onClick={handleViewClick}>
            <div className="card-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h3>View Student Details</h3>
            <p>Browse and search through all student records</p>
            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="students-chart-section">
          <div className="chart-header">
            <h2>Student Strength by Class</h2>
            <p>Overview of student distribution across different classes • Click on any bar to view filtered students</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart 
                data={classData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                onClick={(data: any) => {
                  if (data && data.activePayload && data.activePayload[0]) {
                    const entry = data.activePayload[0].payload
                    handleBarClick(entry)
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="class" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  stroke="#94a3b8"
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  stroke="#94a3b8"
                  label={{ value: 'Number of Students', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                />
                <Bar 
                  dataKey="students" 
                  fill="url(#colorGradient)"
                  radius={[8, 8, 0, 0]}
                >
                  {classData.map((entry, index) => (
                    <Cell key={`cell-${index}`} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#667eea" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#764ba2" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students
