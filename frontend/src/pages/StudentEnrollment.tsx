import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudents } from '../context/StudentContext'
import './StudentEnrollment.css'

const StudentEnrollment: React.FC = () => {
  const navigate = useNavigate()
  const { students } = useStudents()
  const [showSuccess, setShowSuccess] = useState(false)
  const [filters, setFilters] = useState({
    course: '',
    year: '',
    class: ''
  })
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])

  const courses = [
    'Mathematics 101',
    'Physics 201',
    'Chemistry 301',
    'Biology 201',
    'Computer Science 101'
  ]

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const filteredStudents = students.filter(student => {
    if (filters.year && student.year !== filters.year) return false
    if (filters.class && student.class !== filters.class) return false
    return true
  })

  const handleStudentToggle = (studentId: number) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!filters.course) {
      alert('Please select a course')
      return
    }
    if (selectedStudents.length === 0) {
      alert('Please select at least one student')
      return
    }

    console.log('Enrollment:', {
      course: filters.course,
      students: selectedStudents,
      studentDetails: students.filter(s => selectedStudents.includes(s.id))
    })

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setSelectedStudents([])
      setFilters({ course: '', year: '', class: '' })
    }, 2000)
  }

  return (
    <div className="student-enrollment-page">
      <div className="enrollment-header">
        <button className="back-button" onClick={() => navigate('/courses')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Student Enrollment</h1>
        <p>Enroll students in courses</p>
      </div>

      {showSuccess && (
        <div className="success-message">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          {selectedStudents.length} student(s) enrolled successfully!
        </div>
      )}

      <div className="enrollment-content">
        <form className="enrollment-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Enrollment Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="course">Course <span className="required">*</span></label>
                <select
                  id="course"
                  name="course"
                  value={filters.course}
                  onChange={handleFilterChange}
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="year">Filter by Year</label>
                <select
                  id="year"
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
              <div className="form-group">
                <label htmlFor="class">Filter by Class</label>
                <select
                  id="class"
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
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h2>Select Students ({selectedStudents.length} selected)</h2>
              <button
                type="button"
                className="select-all-btn"
                onClick={handleSelectAll}
              >
                {selectedStudents.length === filteredStudents.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="students-list">
              {filteredStudents.map(student => (
                <div
                  key={student.id}
                  className={`student-checkbox-item ${selectedStudents.includes(student.id) ? 'selected' : ''}`}
                  onClick={() => handleStudentToggle(student.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentToggle(student.id)}
                    className="student-checkbox"
                  />
                  <div className="student-info">
                    <span className="student-name">{student.firstName} {student.lastName}</span>
                    <span className="student-details">ID: {student.id} | {student.year} | Class {student.class}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/courses')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={selectedStudents.length === 0 || !filters.course}>
              Enroll Students
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentEnrollment
