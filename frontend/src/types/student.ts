export interface Document {
  name: string
  data: string // base64 encoded file data
  type: string // MIME type
}

export interface Student {
  id: number
  firstName: string
  lastName: string
  email: string
  enrollmentYear: number
  dob: string
  major: string
  class: string
  year: string
  photo?: string // base64 encoded image
  documents?: Document[]
}

export interface StudentFormData {
  firstName: string
  lastName: string
  email: string
  enrollmentYear: number
  dob: string
  major: string
  class: string
  year: string
  photo?: string
  documents?: Document[]
}
