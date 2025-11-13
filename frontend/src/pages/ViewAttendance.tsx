import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ViewAttendance.css'

const ViewAttendance: React.FC = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    date: '',
    year: '',
    class: '',
    course: ''
  })

  // Sample attendance data
  const attendanceData = [
    { id: 1, studentId: 1, studentName: 'John Doe', date: '2024-01-15', status: 'present', year: '1st Year', class: 'A', course: 'Mathematics 101' },
    { id: 2, studentId: 2, studentName: 'Jane Smith', date: '2024-01-15', status: 'absent', year: '2nd Year', class: 'B', course: 'Physics 201' },
    { id: 3, studentId: 3, studentName: 'Mike Johnson', date: '2024-01-15', status: 'late', year: '3rd Year', class: 'A', course: 'Chemistry 301' },
    { id: 4, studentId: 1, studentName: 'John Doe', date: '2024-01-16', status: 'present', year: '1st Year', class: 'A', course: 'Mathematics 101' },
    { id: 5, studentId: 2, studentName: 'Jane Smith', date: '2024-01-16', status: 'present', year: '2nd Year', class: 'B', course: 'Physics 201' },
  ]

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setFilters({ date: '', year: '', class: '', course: '' })
  }

  const filteredData = attendanceData.filter(record => {
    if (filters.date && record.date !== filters.date) return false
    if (filters.year && record.year !== filters.year) return false
    if (filters.class && record.class !== filters.class) return false
    if (filters.course && record.course !== filters.course) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    const statusClasses: { [key: string]: string } = {
      present: 'status-badge present',
      absent: 'status-badge absent',
      late: 'status-badge late',
      excused: 'status-badge excused'
    }
    return statusClasses[status] || 'status-badge'
  }

  return (
    <div className="view-attendance-page">
      <div className="view-attendance-header">
        <button className="back-button" onClick={() => navigate('/attendance')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>View Attendance Records</h1>
        <p>Browse and filter attendance history</p>
      </div>

      <div className="view-attendance-content">
        <div className="filter-section">
          <h2>Filter Records</h2>
          <div className="filter-form">
            <div className="filter-group">
              <label htmlFor="filter-date">Date</label>
              <input
                type="date"
                id="filter-date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="filter-year">Year</label>
              <select
                id="filter-year"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
              >
                <option value="">All Years</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="filter-class">Class</label>
              <select
                id="filter-class"
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
              >
                <option value="">All Classes</option>
                <option value="A">Class A</option>
                <option value="B">Class B</option>
                <option value="C">Class C</option>
                <option value="D">Class D</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="filter-course">Course</label>
              <input
                type="text"
                id="filter-course"
                name="course"
                value={filters.course}
                onChange={handleFilterChange}
                placeholder="Course name"
              />
            </div>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="attendance-records-section">
          <div className="table-header">
            <h2>Attendance Records</h2>
            <span className="record-count">{filteredData.length} record(s) found</span>
          </div>

          {filteredData.length === 0 ? (
            <div className="no-records">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <p>No attendance records found matching the filters</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="attendance-records-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Year</th>
                    <th>Class</th>
                    <th>Course</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record) => (
                    <tr key={record.id}>
                      <td>{record.date}</td>
                      <td>{record.studentId}</td>
                      <td>{record.studentName}</td>
                      <td>{record.year}</td>
                      <td>{record.class}</td>
                      <td>{record.course}</td>
                      <td>
                        <span className={getStatusBadge(record.status)}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewAttendance
