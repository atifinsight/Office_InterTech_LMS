// Help.jsx
"use client"

import { useState } from "react"
import "./Help.css"
import Header from "../Header/Header";

const Help = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Your message has been sent! ✅")
    setFormData({ name: "", email: "", message: "" })
  }

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "Go to the login screen, click 'Forgot Password', and follow the instructions sent to your registered email.",
    },
    {
      question: "How can I enroll in a course?",
      answer:
        "Navigate to the 'Courses' section, select the course you want, and click on the 'Enroll' button.",
    },
    {
      question: "How do I contact my instructor?",
      answer:
        "Go to the course page and use the 'Message Instructor' button or check the instructor’s profile for contact info.",
    },
    {
      question: "Where can I see my attendance report?",
      answer:
        "Visit the 'Reports' section and switch to the 'Attendance' tab to view your detailed attendance records.",
    },
  ]
  const onLogout = () => {
    localStorage.clear(); // or selectively clear auth tokens
    window.location.href = "/"; // Redirect to login page
  }

  return (
    <div className="help-section">
      <Header onLogout={onLogout} />
      <div className="page-header">
        <h1>Help & Support</h1>
        <p>Need assistance? We're here to help you every step of the way.</p>
      </div>

      <div className="help-grid">
        {/* Contact Info */}
        <div className="help-card">
          <h2>Contact Support</h2>
          <p>Reach us through the following channels:</p>
          <div className="help-info">
            <p><strong>📞 Phone:</strong> +1 (800) 123-4567</p>
            <p><strong>📧 Email:</strong> support@intertechlms.com</p>
            <p><strong>⏰ Hours:</strong> Mon - Fri, 9:00 AM – 6:00 PM (EST)</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="help-card">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-section">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  <span>{faq.question}</span>
                  <span>{expandedFAQ === index ? "−" : "+"}</span>
                </div>
                {expandedFAQ === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="help-card">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
            <textarea
              rows="4"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Help
