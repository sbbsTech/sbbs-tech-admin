import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Student, StudentFormData } from '../types/student'
import { studentApi } from '../services/api'

interface StudentContextType {
  students: Student[]
  loading: boolean
  addStudent: (student: StudentFormData) => Promise<void>
  updateStudent: (id: number, student: StudentFormData) => Promise<void>
  deleteStudent: (id: number) => Promise<void>
  refreshStudents: () => Promise<void>
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export const useStudents = () => {
  const context = useContext(StudentContext)
  if (!context) {
    throw new Error('useStudents must be used within StudentProvider')
  }
  return context
}

interface StudentProviderProps {
  children: ReactNode
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch students on mount
  useEffect(() => {
    refreshStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refreshStudents = async () => {
    setLoading(true)
    console.log('🔄 Refreshing students list...')
    const response = await studentApi.getAllStudents()
    if (response.data) {
      setStudents(response.data)
      console.log('✅ Students list updated:', response.data)
    } else if (response.error) {
      console.error('❌ Failed to refresh students:', response.error)
    }
    setLoading(false)
  }

  const addStudent = async (studentData: StudentFormData) => {
    console.log('➕ Adding new student:', studentData)
    const response = await studentApi.createStudent(studentData)
    
    if (response.data) {
      console.log('✅ Student created successfully:', response.data)
      // Refresh the list
      await refreshStudents()
    } else if (response.error) {
      console.error('❌ Failed to create student:', response.error)
      throw new Error(response.error)
    }
  }

  const updateStudent = async (id: number, studentData: StudentFormData) => {
    console.log('✏️ Updating student:', id, studentData)
    const response = await studentApi.updateStudent(id, studentData)
    
    if (response.data) {
      console.log('✅ Student updated successfully:', response.data)
      // Refresh the list
      await refreshStudents()
    } else if (response.error) {
      console.error('❌ Failed to update student:', response.error)
      throw new Error(response.error)
    }
  }

  const deleteStudent = async (id: number) => {
    console.log('🗑️ Deleting student:', id)
    const response = await studentApi.deleteStudent(id)
    
    if (!response.error) {
      console.log('✅ Student deleted successfully:', id)
      // Refresh the list
      await refreshStudents()
    } else {
      console.error('❌ Failed to delete student:', response.error)
      throw new Error(response.error)
    }
  }

  return (
    <StudentContext.Provider value={{ students, loading, addStudent, updateStudent, deleteStudent, refreshStudents }}>
      {children}
    </StudentContext.Provider>
  )
}
