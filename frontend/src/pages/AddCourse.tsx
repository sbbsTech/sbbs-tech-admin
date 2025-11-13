import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddCourse.css'

const AddCourse: React.FC = () => {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    department: '',
    credits: '',
    year: '',
    instructor: '',
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.courseCode || !formData.courseName || !formData.department || !formData.credits) {
      alert('Please fill in all required fields')
      return
    }

    console.log('Course Added:', formData)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/courses')
    }, 2000)
  }

  return (
    <div className="add-course-page">
      <div className="add-course-header">
        <button className="back-button" onClick={() => navigate('/courses')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Add New Course</h1>
        <p>Create a new course in the system</p>
      </div>

      {showSuccess && (
        <div className="success-message">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          Course added successfully!
        </div>
      )}

      <div className="add-course-content">
        <form className="course-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="courseCode">Course Code <span className="required">*</span></label>
              <input
                type="text"
                id="courseCode"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleChange}
                required
                placeholder="e.g., MATH101"
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseName">Course Name <span className="required">*</span></label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                required
                placeholder="e.g., Mathematics 101"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department <span className="required">*</span></label>
              <select id="department" name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="credits">Credits <span className="required">*</span></label>
              <input
                type="number"
                id="credits"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                required
                min="1"
                max="6"
                placeholder="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year Level</label>
              <select id="year" name="year" value={formData.year} onChange={handleChange}>
                <option value="">Any Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="instructor">Instructor</label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="Instructor name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Course description..."
              className="textarea-input"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/courses')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCourse
