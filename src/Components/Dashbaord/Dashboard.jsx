"use client"

import { useState } from "react"
import "./Dashboard.css"
import Header from "../Header/Header";


const Dashboard = () => {

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: "Programming Workshop",
      time: "10:00 AM - 11:00 AM",
      icon: "💻",
    },
    {
      id: 2,
      title: "Data Analysis Q&A",
      time: "2:00 PM - 3:00 PM",
      icon: "📈",
    },
    {
      id: 3,
      title: "Project Management Meeting",
      time: "4:00 PM - 5:00 PM",
      icon: "👥",
    },
  ])

  const [courses] = useState([
    {
      id: 1,
      title: "Introduction to Programming",
      description: "Learn the basics of coding with Python.",
      image: "https://johnthecomputerman.co.uk/storage/2021/05/introtoprogramming-190909184629-thumbnail-4.jpg",
    },
    {
      id: 2,
      title: "Advanced Data Analysis",
      description: "Master data analysis techniques using R.",
      image: "https://d2ms8rpfqc4h24.cloudfront.net/Advanced_Data_Analytics_Techniques_27ef846f26.jpg",
    },
    {
      id: 3,
      title: "Project Management Fundamentals",
      description: "Understand the principles of project management.",
      image: "https://i.ytimg.com/vi/dANtsg4yT9s/maxresdefault.jpg",
    },
  ])

  const onLogout = () => {
    localStorage.clear(); // or selectively clear auth tokens
    window.location.href = "/"; // Redirect to login page
  }

  return (
    <div className="dashboard">
      <Header onLogout={onLogout} />
       <div className="dashboard-header">
        <h1>Welcome, Alex</h1>
      </div>

      <div className="dashboard-content">
        <div className="courses-section">
          <h2>My Courses</h2>
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <img src={course.image || "/placeholder.svg"} alt={course.title} />
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="events-section">
          <h2>Upcoming Events</h2>
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-item">
                <span className="event-icon">{event.icon}</span>
                <div className="event-details">
                  <h4>{event.title}</h4>
                  <p>{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
