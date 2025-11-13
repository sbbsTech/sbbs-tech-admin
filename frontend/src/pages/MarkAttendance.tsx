import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudents } from '../context/StudentContext'
import './MarkAttendance.css'

interface AttendanceRecord {
  studentId: number
  studentName: string
  status: 'present' | 'absent' | 'late' | 'excused'
}

const MarkAttendance: React.FC = () => {
  const navigate = useNavigate()
  const { students } = useStudents()
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    year: '',
    class: '',
    course: ''
  })
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [filteredStudents, setFilteredStudents] = useState(students)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Filter students based on year and class
    if (name === 'year' || name === 'class') {
      const filtered = students.filter(student => {
        if (name === 'year' && value && student.year !== value) return false
        if (name === 'class' && value && student.class !== value) return false
        return true
      })
      setFilteredStudents(filtered)
      
      // Initialize attendance records for filtered students
      setAttendanceRecords(filtered.map(student => ({
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        status: 'present' as const
      })))
    }
  }

  const handleStatusChange = (studentId: number, status: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendanceRecords(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, status } : record
      )
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.date || !formData.year || !formData.class) {
      alert('Please fill in all required fields')
      return
    }
    
    if (attendanceRecords.length === 0) {
      alert('Please filter students first')
      return
    }

    // Log attendance data
    console.log('Attendance Marked:', {
      date: formData.date,
      year: formData.year,
      class: formData.class,
      course: formData.course,
      records: attendanceRecords
    })

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/attendance')
    }, 2000)
  }

  return (
    <div className="mark-attendance-page">
      <div className="mark-attendance-header">
        <button className="back-button" onClick={() => navigate('/attendance')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Mark Attendance</h1>
        <p>Record attendance for students</p>
      </div>

      {showSuccess && (
        <div className="success-message">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          Attendance marked successfully!
        </div>
      )}

      <div className="mark-attendance-content">
        <form className="attendance-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Attendance Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date <span className="required">*</span></label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFilterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year <span className="required">*</span></label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleFilterChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="class">Class <span className="required">*</span></label>
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleFilterChange}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="A">Class A</option>
                  <option value="B">Class B</option>
                  <option value="C">Class C</option>
                  <option value="D">Class D</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="course">Course</label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleFilterChange}
                  placeholder="e.g., Mathematics 101"
                />
              </div>
            </div>
          </div>

          {attendanceRecords.length > 0 && (
            <div className="form-section">
              <h2>Student Attendance ({attendanceRecords.length} students)</h2>
              <div className="attendance-table-container">
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record) => (
                      <tr key={record.studentId}>
                        <td>{record.studentId}</td>
                        <td>{record.studentName}</td>
                        <td>
                          <div className="status-buttons">
                            <button
                              type="button"
                              className={`status-btn ${record.status === 'present' ? 'active present' : ''}`}
                              onClick={() => handleStatusChange(record.studentId, 'present')}
                            >
                              Present
                            </button>
                            <button
                              type="button"
                              className={`status-btn ${record.status === 'absent' ? 'active absent' : ''}`}
                              onClick={() => handleStatusChange(record.studentId, 'absent')}
                            >
                              Absent
                            </button>
                            <button
                              type="button"
                              className={`status-btn ${record.status === 'late' ? 'active late' : ''}`}
                              onClick={() => handleStatusChange(record.studentId, 'late')}
                            >
                              Late
                            </button>
                            <button
                              type="button"
                              className={`status-btn ${record.status === 'excused' ? 'active excused' : ''}`}
                              onClick={() => handleStatusChange(record.studentId, 'excused')}
                            >
                              Excused
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/attendance')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={attendanceRecords.length === 0}>
              Mark Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MarkAttendance
