// Use environment variable for API URL, fallback to relative path for same-domain deployment
// For GoDaddy: API will be on same domain, so use relative path
// For development: use localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? 'http://localhost:8000/api' : '/api')

export interface ApiResponse<T> {
  data?: T
  error?: string
}

// Student API calls
export const studentApi = {
  // Get all students
  async getAllStudents(year?: string, class_name?: string): Promise<ApiResponse<any[]>> {
    try {
      const params = new URLSearchParams()
      if (year) params.append('year', year)
      if (class_name) params.append('class_name', class_name)
      
      const url = `${API_BASE_URL}/students${params.toString() ? '?' + params.toString() : ''}`
      console.log('='.repeat(80))
      console.log('🟢 FRONTEND API CALL: GET /api/students')
      console.log('📤 Endpoint:', url)
      console.log('📥 Query Parameters:')
      console.log('   - year:', year || 'none')
      console.log('   - class_name:', class_name || 'none')
      console.log('='.repeat(80))
      
      const response = await fetch(url)
      const data = await response.json()
      
      console.log('='.repeat(80))
      console.log('✅ FRONTEND API RESPONSE: GET /api/students')
      console.log('📥 Response Status:', response.status)
      console.log('📥 Response Data:', data)
      console.log(`📥 Records Count: ${Array.isArray(data) ? data.length : 'N/A'}`)
      console.log('='.repeat(80))
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch students')
      }
      
      return { data }
    } catch (error: any) {
      console.error('❌ API Error - GET Students:', error)
      return { error: error.message || 'Failed to fetch students' }
    }
  },

  // Get student by ID
  async getStudentById(id: number): Promise<ApiResponse<any>> {
    try {
      const url = `${API_BASE_URL}/students/${id}`
      console.log('='.repeat(80))
      console.log('🟢 FRONTEND API CALL: GET /api/students/:id')
      console.log('📤 Endpoint:', url)
      console.log('📥 Path Parameter: id =', id)
      console.log('='.repeat(80))
      
      const response = await fetch(url)
      const data = await response.json()
      
      console.log('='.repeat(80))
      console.log('✅ FRONTEND API RESPONSE: GET /api/students/:id')
      console.log('📥 Response Status:', response.status)
      console.log('📥 Response Data:', data)
      console.log('='.repeat(80))
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch student')
      }
      
      return { data }
    } catch (error: any) {
      console.error('❌ API Error - GET Student:', error)
      return { error: error.message || 'Failed to fetch student' }
    }
  },

  // Create student
  async createStudent(studentData: any): Promise<ApiResponse<any>> {
    try {
      const url = `${API_BASE_URL}/students/`
      console.log('='.repeat(80))
      console.log('🟢 FRONTEND API CALL: POST /api/students/')
      console.log('📤 Endpoint:', url)
      console.log('📥 Request Payload:')
      console.log('   - firstName:', studentData.firstName)
      console.log('   - lastName:', studentData.lastName)
      console.log('   - email:', studentData.email)
      console.log('   - enrollmentYear:', studentData.enrollmentYear)
      console.log('   - dob:', studentData.dob || 'none')
      console.log('   - major:', studentData.major || 'none')
      console.log('   - class:', studentData.class)
      console.log('   - year:', studentData.year)
      console.log('   - photo:', studentData.photo ? 'Present' : 'none')
      console.log('   - documents:', studentData.documents ? `${studentData.documents.length} document(s)` : 'none')
      console.log('   Full payload:', JSON.stringify(studentData, null, 2))
      console.log('='.repeat(80))
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      })
      
      const data = await response.json()
      console.log('='.repeat(80))
      console.log('✅ FRONTEND API RESPONSE: POST /api/students/')
      console.log('📥 Response Status:', response.status)
      console.log('📥 Response Data:', data)
      console.log('='.repeat(80))
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create student')
      }
      
      return { data }
    } catch (error: any) {
      console.error('❌ API Error - POST Student:', error)
      return { error: error.message || 'Failed to create student' }
    }
  },

  // Update student
  async updateStudent(id: number, studentData: any): Promise<ApiResponse<any>> {
    try {
      const url = `${API_BASE_URL}/students/${id}`
      console.log('='.repeat(80))
      console.log('🟢 FRONTEND API CALL: PUT /api/students/:id')
      console.log('📤 Endpoint:', url)
      console.log('📥 Path Parameter: id =', id)
      console.log('📥 Request Payload:')
      const updateKeys = Object.keys(studentData)
      updateKeys.forEach(key => {
        if (key === 'documents' && studentData[key]) {
          console.log(`   - ${key}: ${studentData[key].length} document(s)`)
        } else if (key === 'photo' && studentData[key]) {
          console.log(`   - ${key}: Present (base64)`)
        } else {
          console.log(`   - ${key}:`, studentData[key])
        }
      })
      console.log('   Full payload:', JSON.stringify(studentData, null, 2))
      console.log('='.repeat(80))
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      })
      
      const data = await response.json()
      console.log('='.repeat(80))
      console.log('✅ FRONTEND API RESPONSE: PUT /api/students/:id')
      console.log('📥 Response Status:', response.status)
      console.log('📥 Response Data:', data)
      console.log('='.repeat(80))
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to update student')
      }
      
      return { data }
    } catch (error: any) {
      console.error('❌ API Error - PUT Student:', error)
      return { error: error.message || 'Failed to update student' }
    }
  },

  // Delete student
  async deleteStudent(id: number): Promise<ApiResponse<void>> {
    try {
      const url = `${API_BASE_URL}/students/${id}`
      console.log('='.repeat(80))
      console.log('🟢 FRONTEND API CALL: DELETE /api/students/:id')
      console.log('📤 Endpoint:', url)
      console.log('📥 Path Parameter: id =', id)
      console.log('='.repeat(80))
      
      const response = await fetch(url, {
        method: 'DELETE',
      })
      
      console.log('='.repeat(80))
      console.log('✅ FRONTEND API RESPONSE: DELETE /api/students/:id')
      console.log('📥 Response Status:', response.status)
      console.log('='.repeat(80))
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.detail || 'Failed to delete student')
      }
      
      return {}
    } catch (error: any) {
      console.error('❌ API Error - DELETE Student:', error)
      return { error: error.message || 'Failed to delete student' }
    }
  },
}

