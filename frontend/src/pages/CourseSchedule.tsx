import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CourseSchedule.css'

const CourseSchedule: React.FC = () => {
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState('Monday')

  const scheduleData = {
    Monday: [
      { time: '09:00-10:30', course: 'Mathematics 101', room: 'Room 201', instructor: 'Dr. Smith' },
      { time: '11:00-12:30', course: 'Physics 201', room: 'Room 305', instructor: 'Dr. Johnson' },
      { time: '14:00-15:30', course: 'Chemistry 301', room: 'Lab 102', instructor: 'Dr. Williams' },
    ],
    Tuesday: [
      { time: '09:00-10:30', course: 'Biology 201', room: 'Room 205', instructor: 'Dr. Brown' },
      { time: '11:00-12:30', course: 'Computer Science 101', room: 'Lab 201', instructor: 'Dr. Davis' },
    ],
    Wednesday: [
      { time: '09:00-10:30', course: 'Mathematics 101', room: 'Room 201', instructor: 'Dr. Smith' },
      { time: '14:00-15:30', course: 'Physics 201', room: 'Room 305', instructor: 'Dr. Johnson' },
    ],
    Thursday: [
      { time: '09:00-10:30', course: 'Chemistry 301', room: 'Lab 102', instructor: 'Dr. Williams' },
      { time: '11:00-12:30', course: 'Biology 201', room: 'Room 205', instructor: 'Dr. Brown' },
    ],
    Friday: [
      { time: '09:00-10:30', course: 'Computer Science 101', room: 'Lab 201', instructor: 'Dr. Davis' },
    ],
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  return (
    <div className="course-schedule-page">
      <div className="schedule-header">
        <button className="back-button" onClick={() => navigate('/courses')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Course Schedule</h1>
        <p>View and manage class schedules</p>
      </div>

      <div className="schedule-content">
        <div className="schedule-tabs">
          {days.map(day => (
            <button
              key={day}
              className={`day-tab ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="schedule-table-section">
          <h2>{selectedDay} Schedule</h2>
          {scheduleData[selectedDay as keyof typeof scheduleData].length === 0 ? (
            <div className="no-schedule">
              <p>No classes scheduled for {selectedDay}</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Course</th>
                    <th>Room</th>
                    <th>Instructor</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData[selectedDay as keyof typeof scheduleData].map((item, index) => (
                    <tr key={index}>
                      <td><strong>{item.time}</strong></td>
                      <td>{item.course}</td>
                      <td>{item.room}</td>
                      <td>{item.instructor}</td>
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

export default CourseSchedule
