import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Student, StudentFormData } from '../types/student'

interface StudentContextType {
  students: Student[]
  addStudent: (student: StudentFormData) => void
  updateStudent: (id: number, student: StudentFormData) => void
  deleteStudent: (id: number) => void
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
  // Initialize with sample data
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      enrollmentYear: 2023,
      dob: '2005-05-15',
      major: 'Computer Science',
      class: 'A',
      year: '1st Year'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      enrollmentYear: 2022,
      dob: '2004-08-20',
      major: 'Mathematics',
      class: 'B',
      year: '2nd Year'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      enrollmentYear: 2021,
      dob: '2003-12-10',
      major: 'Physics',
      class: 'A',
      year: '3rd Year'
    }
  ])

  const addStudent = (studentData: StudentFormData) => {
    const newStudent: Student = {
      id: Date.now(), // Simple ID generation
      ...studentData
    }
    setStudents(prev => [...prev, newStudent])
    
    // Log to console
    console.log('Student registered successfully:', newStudent)
    console.log('All students:', [...students, newStudent])
  }

  const updateStudent = (id: number, studentData: StudentFormData) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, ...studentData } : student
      )
    )
    console.log('Student updated:', { id, ...studentData })
  }

  const deleteStudent = (id: number) => {
    setStudents(prev => prev.filter(student => student.id !== id))
    console.log('Student deleted:', id)
  }

  return (
    <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  )
}
