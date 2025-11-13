import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useStudents } from '../context/StudentContext'
import { Student } from '../types/student'
import './ViewStudents.css'

const ViewStudents: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { students, deleteStudent } = useStudents()
  const [filters, setFilters] = useState({
    year: '',
    class: ''
  })
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  // Initialize filters from URL params
  useEffect(() => {
    const yearParam = searchParams.get('year')
    const classParam = searchParams.get('class')
    
    if (yearParam || classParam) {
      setFilters({
        year: yearParam || '',
        class: classParam || ''
      })
    }
  }, [searchParams])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    navigate(`/students/edit/${student.id}`)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id)
    }
  }

  const handleDownloadDocument = (doc: { name: string; data: string; type: string }, studentName: string) => {
    try {
      // Convert base64 to blob
      const base64Data = doc.data.includes(',') ? doc.data.split(',')[1] : doc.data
      const byteCharacters = atob(base64Data)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: doc.type })

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = doc.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading document:', error)
      alert('Failed to download document')
    }
  }

  const filteredStudents = students.filter(student => {
    if (filters.year && student.year !== filters.year) return false
    if (filters.class && student.class !== filters.class) return false
    return true
  })

  const clearFilters = () => {
    setFilters({ year: '', class: '' })
  }

  return (
    <div className="view-students-page">
      <div className="view-header">
        <button className="back-button" onClick={() => navigate('/students')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>View Student Details</h1>
        <p>Filter and manage student records</p>
      </div>

      <div className="view-content">
        <div className="filter-section">
          <h2>Filter Students</h2>
          <div className="filter-form">
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

            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="students-table-section">
          <div className="table-header">
            <h2>Student Records</h2>
            <span className="student-count">{filteredStudents.length} student(s) found</span>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="no-students">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <p>No students found matching the filters</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Year</th>
                    <th>Class</th>
                    <th>Major</th>
                    <th>Enrollment Year</th>
                    <th>Documents</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        {student.photo ? (
                          <div className="student-photo">
                            <img src={student.photo} alt={`${student.firstName} ${student.lastName}`} />
                          </div>
                        ) : (
                          <div className="student-photo-placeholder">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                          </div>
                        )}
                      </td>
                      <td>{student.id}</td>
                      <td>{student.firstName} {student.lastName}</td>
                      <td>{student.email}</td>
                      <td>{student.year}</td>
                      <td>{student.class}</td>
                      <td>{student.major || 'N/A'}</td>
                      <td>{student.enrollmentYear}</td>
                      <td>
                        {student.documents && student.documents.length > 0 ? (
                          <div className="documents-download">
                            {student.documents.map((doc, index) => (
                              <button
                                key={index}
                                className="download-doc-btn"
                                onClick={() => handleDownloadDocument(doc, `${student.firstName} ${student.lastName}`)}
                                title={`Download ${doc.name}`}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                  <polyline points="7,10 12,15 17,10"/>
                                  <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                <span>{doc.name}</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="no-documents">No documents</span>
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn edit-btn"
                            onClick={() => handleEdit(student)}
                            title="Edit"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDelete(student.id)}
                            title="Delete"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3,6 5,6 21,6"/>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                          </button>
                        </div>
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

export default ViewStudents
