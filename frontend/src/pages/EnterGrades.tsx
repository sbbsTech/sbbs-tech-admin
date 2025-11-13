import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudents } from '../context/StudentContext'
import './EnterGrades.css'

interface GradeRecord {
  studentId: number
  studentName: string
  grade: string
  score: number
}

const EnterGrades: React.FC = () => {
  const navigate = useNavigate()
  const { students } = useStudents()
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    course: '',
    assignment: '',
    year: '',
    class: '',
    maxScore: 100
  })
  const [gradeRecords, setGradeRecords] = useState<GradeRecord[]>([])
  const [filteredStudents, setFilteredStudents] = useState(students)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'year' || name === 'class') {
      const filtered = students.filter(student => {
        if (name === 'year' && value && student.year !== value) return false
        if (name === 'class' && value && student.class !== value) return false
        return true
      })
      setFilteredStudents(filtered)
      setGradeRecords(filtered.map(student => ({
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        grade: '',
        score: 0
      })))
    }
  }

  const handleGradeChange = (studentId: number, field: 'grade' | 'score', value: string | number) => {
    setGradeRecords(prev =>
      prev.map(record => {
        if (record.studentId === studentId) {
          const updated = { ...record, [field]: value }
          // Auto-calculate grade from score
          if (field === 'score') {
            const score = Number(value)
            const percentage = (score / formData.maxScore) * 100
            if (percentage >= 90) updated.grade = 'A'
            else if (percentage >= 80) updated.grade = 'B'
            else if (percentage >= 70) updated.grade = 'C'
            else if (percentage >= 60) updated.grade = 'D'
            else updated.grade = 'F'
          }
          return updated
        }
        return record
      })
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.course || !formData.assignment || !formData.year || !formData.class) {
      alert('Please fill in all required fields')
      return
    }
    
    console.log('Grades Entered:', { formData, gradeRecords })
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/grades')
    }, 2000)
  }

  return (
    <div className="enter-grades-page">
      <div className="enter-grades-header">
        <button className="back-button" onClick={() => navigate('/grades')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Enter Grades</h1>
        <p>Record grades for assignments and exams</p>
      </div>

      {showSuccess && (
        <div className="success-message">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          Grades entered successfully!
        </div>
      )}

      <div className="enter-grades-content">
        <form className="grades-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Grade Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="course">Course <span className="required">*</span></label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleFilterChange}
                  required
                  placeholder="e.g., Mathematics 101"
                />
              </div>
              <div className="form-group">
                <label htmlFor="assignment">Assignment/Exam <span className="required">*</span></label>
                <input
                  type="text"
                  id="assignment"
                  name="assignment"
                  value={formData.assignment}
                  onChange={handleFilterChange}
                  required
                  placeholder="e.g., Midterm Exam"
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year <span className="required">*</span></label>
                <select id="year" name="year" value={formData.year} onChange={handleFilterChange} required>
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
                <select id="class" name="class" value={formData.class} onChange={handleFilterChange} required>
                  <option value="">Select Class</option>
                  <option value="A">Class A</option>
                  <option value="B">Class B</option>
                  <option value="C">Class C</option>
                  <option value="D">Class D</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="maxScore">Max Score</label>
                <input
                  type="number"
                  id="maxScore"
                  name="maxScore"
                  value={formData.maxScore}
                  onChange={handleFilterChange}
                  min="1"
                />
              </div>
            </div>
          </div>

          {gradeRecords.length > 0 && (
            <div className="form-section">
              <h2>Student Grades ({gradeRecords.length} students)</h2>
              <div className="grades-table-container">
                <table className="grades-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Score</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradeRecords.map((record) => (
                      <tr key={record.studentId}>
                        <td>{record.studentId}</td>
                        <td>{record.studentName}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max={formData.maxScore}
                            value={record.score}
                            onChange={(e) => handleGradeChange(record.studentId, 'score', Number(e.target.value))}
                            className="score-input"
                          />
                        </td>
                        <td>
                          <span className={`grade-badge grade-${record.grade.toLowerCase()}`}>
                            {record.grade || '-'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/grades')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={gradeRecords.length === 0}>
              Save Grades
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EnterGrades
