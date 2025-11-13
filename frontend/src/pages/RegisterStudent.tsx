import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudents } from '../context/StudentContext'
import { StudentFormData, Document } from '../types/student'
import './RegisterStudent.css'

const RegisterStudent: React.FC = () => {
  const navigate = useNavigate()
  const { addStudent } = useStudents()
  const [showSuccess, setShowSuccess] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    enrollmentYear: new Date().getFullYear(),
    dob: '',
    major: '',
    class: '',
    year: '1st Year',
    documents: []
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result as string
          setFormData(prev => ({ ...prev, photo: base64String }))
          setPhotoPreview(base64String)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Please upload an image file')
      }
    }
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const documentPromises: Promise<Document>[] = []
      
      Array.from(files).forEach(file => {
        const promise = new Promise<Document>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve({
              name: file.name,
              data: reader.result as string,
              type: file.type
            })
          }
          reader.readAsDataURL(file)
        })
        documentPromises.push(promise)
      })

      Promise.all(documentPromises).then(documents => {
        setFormData(prev => ({
          ...prev,
          documents: [...(prev.documents || []), ...documents]
        }))
      })
    }
  }

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents?.filter((_, i) => i !== index) || []
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.class || !formData.year) {
      alert('Please fill in all required fields')
      return
    }

    // Add student
    addStudent(formData)
    
    // Show success message
    setShowSuccess(true)
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      enrollmentYear: new Date().getFullYear(),
      dob: '',
      major: '',
      class: '',
      year: '1st Year',
      documents: []
    })
    setPhotoPreview(null)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="register-student-page">
      <div className="register-header">
        <button className="back-button" onClick={() => navigate('/students')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Register New Student</h1>
        <p>Fill in the student information below</p>
      </div>

      {showSuccess && (
        <div className="success-message">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          Student registered successfully!
        </div>
      )}

      <div className="register-content">
        <form className="student-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name <span className="required">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name <span className="required">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="student@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">Year <span className="required">*</span></label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
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
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                <option value="A">Class A</option>
                <option value="B">Class B</option>
                <option value="C">Class C</option>
                <option value="D">Class D</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="enrollmentYear">Enrollment Year</label>
              <input
                type="number"
                id="enrollmentYear"
                name="enrollmentYear"
                value={formData.enrollmentYear}
                onChange={handleChange}
                min="2000"
                max="2100"
                placeholder="2024"
              />
            </div>

            <div className="form-group">
              <label htmlFor="major">Major</label>
              <input
                type="text"
                id="major"
                name="major"
                value={formData.major}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="photo">Student Photo</label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="file-input"
                />
                <label htmlFor="photo" className="file-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17,8 12,3 7,8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  {photoPreview ? 'Change Photo' : 'Upload Photo'}
                </label>
              </div>
              {photoPreview && (
                <div className="photo-preview">
                  <img src={photoPreview} alt="Preview" />
                  <button
                    type="button"
                    className="remove-photo-btn"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, photo: undefined }))
                      setPhotoPreview(null)
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="documents">Documents</label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="documents"
                  name="documents"
                  multiple
                  onChange={handleDocumentUpload}
                  className="file-input"
                />
                <label htmlFor="documents" className="file-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  Upload Documents
                </label>
              </div>
              {formData.documents && formData.documents.length > 0 && (
                <div className="documents-list">
                  {formData.documents.map((doc, index) => (
                    <div key={index} className="document-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                      </svg>
                      <span className="document-name">{doc.name}</span>
                      <button
                        type="button"
                        className="remove-doc-btn"
                        onClick={() => removeDocument(index)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/students')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Register Student
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterStudent
