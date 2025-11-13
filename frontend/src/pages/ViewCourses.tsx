import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ViewCourses.css'

const ViewCourses: React.FC = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    department: '',
    year: ''
  })

  const coursesData = [
    { id: 1, code: 'MATH101', name: 'Mathematics 101', department: 'Mathematics', credits: 3, year: '1st Year', instructor: 'Dr. Smith', students: 45 },
    { id: 2, code: 'PHYS201', name: 'Physics 201', department: 'Physics', credits: 4, year: '2nd Year', instructor: 'Dr. Johnson', students: 38 },
    { id: 3, code: 'CHEM301', name: 'Chemistry 301', department: 'Chemistry', credits: 3, year: '3rd Year', instructor: 'Dr. Williams', students: 42 },
  ]

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setFilters({ department: '', year: '' })
  }

  const filteredData = coursesData.filter(course => {
    if (filters.department && course.department !== filters.department) return false
    if (filters.year && course.year !== filters.year) return false
    return true
  })

  return (
    <div className="view-courses-page">
      <div className="view-courses-header">
        <button className="back-button" onClick={() => navigate('/courses')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>View Courses</h1>
        <p>Browse all available courses</p>
      </div>

      <div className="view-courses-content">
        <div className="filter-section">
          <h2>Filter Courses</h2>
          <div className="filter-form">
            <div className="filter-group">
              <label htmlFor="filter-department">Department</label>
              <select id="filter-department" name="department" value={filters.department} onChange={handleFilterChange}>
                <option value="">All Departments</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
              </select>
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
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="courses-table-section">
          <div className="table-header">
            <h2>Course Records</h2>
            <span className="course-count">{filteredData.length} course(s) found</span>
          </div>

          {filteredData.length === 0 ? (
            <div className="no-courses">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <p>No courses found matching the filters</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="courses-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Course Name</th>
                    <th>Department</th>
                    <th>Credits</th>
                    <th>Year</th>
                    <th>Instructor</th>
                    <th>Students</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((course) => (
                    <tr key={course.id}>
                      <td><strong>{course.code}</strong></td>
                      <td>{course.name}</td>
                      <td>{course.department}</td>
                      <td>{course.credits}</td>
                      <td>{course.year}</td>
                      <td>{course.instructor}</td>
                      <td>{course.students}</td>
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

export default ViewCourses
