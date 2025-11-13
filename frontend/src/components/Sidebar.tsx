import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Sidebar.css'

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  submenu?: {
    id: string
    label: string
  }[]
}

const menuItems: MenuItem[] = [
  {
    id: 'students',
    label: 'Students',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    submenu: [
      { id: 'register', label: 'Register Student' },
      { id: 'edit', label: 'Edit Student Details' },
      { id: 'view', label: 'View' }
    ]
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    submenu: [
      { id: 'mark', label: 'Mark Attendance' },
      { id: 'view', label: 'View Records' },
      { id: 'reports', label: 'Reports' }
    ]
  },
  {
    id: 'grades',
    label: 'Grades',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    submenu: [
      { id: 'enter', label: 'Enter Grades' },
      { id: 'view', label: 'View Grades' },
      { id: 'reports', label: 'Grade Reports' }
    ]
  },
  {
    id: 'courses',
    label: 'Courses',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    submenu: [
      { id: 'add', label: 'Add Course' },
      { id: 'view', label: 'View Courses' },
      { id: 'schedule', label: 'Schedule' },
      { id: 'enroll', label: 'Enrollment' }
    ]
  }
]

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleMenuClick = (itemId: string) => {
    if (itemId === 'students') {
      navigate('/students')
    } else if (itemId === 'attendance') {
      navigate('/attendance')
    } else if (itemId === 'grades') {
      navigate('/grades')
    } else if (itemId === 'courses') {
      navigate('/courses')
    }
  }

  const handleSubmenuClick = (itemId: string, subItemId: string) => {
    if (itemId === 'students') {
      if (subItemId === 'register') {
        navigate('/students/register')
      } else if (subItemId === 'edit') {
        navigate('/students/view')
      } else if (subItemId === 'view') {
        navigate('/students/view')
      }
    } else if (itemId === 'attendance') {
      if (subItemId === 'mark') {
        navigate('/attendance/mark')
      } else if (subItemId === 'view') {
        navigate('/attendance/view')
      } else if (subItemId === 'reports') {
        navigate('/attendance/reports')
      }
    } else if (itemId === 'grades') {
      if (subItemId === 'enter') {
        navigate('/grades/enter')
      } else if (subItemId === 'view') {
        navigate('/grades/view')
      } else if (subItemId === 'reports') {
        navigate('/grades/reports')
      }
    } else if (itemId === 'courses') {
      if (subItemId === 'add') {
        navigate('/courses/add')
      } else if (subItemId === 'view') {
        navigate('/courses/view')
      } else if (subItemId === 'schedule') {
        navigate('/courses/schedule')
      } else if (subItemId === 'enroll') {
        navigate('/courses/enroll')
      }
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Student Management</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="nav-item"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div 
              className="nav-item-main"
              onClick={() => handleMenuClick(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.submenu && (
                <span className="nav-arrow">
                  {hoveredItem === item.id ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"/>
                    </svg>
                  )}
                </span>
              )}
            </div>
            
            {item.submenu && hoveredItem === item.id && (
              <div className="submenu">
                {item.submenu.map((subItem) => (
                  <div 
                    key={subItem.id} 
                    className="submenu-item"
                    onClick={() => handleSubmenuClick(item.id, subItem.id)}
                  >
                    {subItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
