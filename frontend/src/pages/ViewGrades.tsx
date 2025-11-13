import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ViewGrades.css'

const ViewGrades: React.FC = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    course: '',
    year: '',
    class: ''
  })

  const gradesData = [
    { id: 1, studentId: 1, studentName: 'John Doe', course: 'Mathematics 101', assignment: 'Midterm Exam', score: 85, grade: 'B', year: '1st Year', class: 'A' },
    { id: 2, studentId: 2, studentName: 'Jane Smith', course: 'Physics 201', assignment: 'Quiz 1', score: 92, grade: 'A', year: '2nd Year', class: 'B' },
    { id: 3, studentId: 3, studentName: 'Mike Johnson', course: 'Chemistry 301', assignment: 'Final Exam', score: 78, grade: 'C', year: '3rd Year', class: 'A' },
  ]

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setFilters({ course: '', year: '', class: '' })
  }

  const filteredData = gradesData.filter(record => {
    if (filters.course && !record.course.toLowerCase().includes(filters.course.toLowerCase())) return false
    if (filters.year && record.year !== filters.year) return false
    if (filters.class && record.class !== filters.class) return false
    return true
  })

  const getGradeClass = (grade: string) => {
    return `grade-badge grade-${grade.toLowerCase()}`
  }

  return (
    <div className="view-grades-page">
      <div className="view-grades-header">
        <button className="back-button" onClick={() => navigate('/grades')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>View Grades</h1>
        <p>Browse and filter student grades</p>
      </div>

      <div className="view-grades-content">
        <div className="filter-section">
          <h2>Filter Grades</h2>
          <div className="filter-form">
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
            <div className="filter-group">
              <label htmlFor="filter-year">Year</label>
              <select id="filter-year" name="year" value={filters.year} onChange={handleFilterChange}>
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
              <select id="filter-class" name="class" value={filters.class} onChange={handleFilterChange}>
                <option value="">All Classes</option>
                <option value="A">Class A</option>
                <option value="B">Class B</option>
                <option value="C">Class C</option>
                <option value="D">Class D</option>
              </select>
            </div>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grades-records-section">
          <div className="table-header">
            <h2>Grade Records</h2>
            <span className="record-count">{filteredData.length} record(s) found</span>
          </div>

          {filteredData.length === 0 ? (
            <div className="no-records">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <p>No grade records found matching the filters</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="grades-records-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Assignment</th>
                    <th>Score</th>
                    <th>Grade</th>
                    <th>Year</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record) => (
                    <tr key={record.id}>
                      <td>{record.studentId}</td>
                      <td>{record.studentName}</td>
                      <td>{record.course}</td>
                      <td>{record.assignment}</td>
                      <td>{record.score}</td>
                      <td>
                        <span className={getGradeClass(record.grade)}>
                          {record.grade}
                        </span>
                      </td>
                      <td>{record.year}</td>
                      <td>{record.class}</td>
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

export default ViewGrades
