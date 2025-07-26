import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // ✅ import this
import "./Registrations.css";
import Header from "../Header/Header";

const Registration = () => {
  const location = useLocation(); // ✅ get location
  const tabFromPath = location.pathname.split("/")[2] || "principal"; // ✅ extract tab from path

  const [activeTab, setActiveTab] = useState(tabFromPath);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", department: "", campus: "",
    courses: "", qualification: "", experience: "",
    course: "", studentId: "", dateOfBirth: "", address: "",
    status: "Active",
  });

  useEffect(() => {
    setActiveTab(tabFromPath); // ✅ update tab on route change
    resetForm();
  }, [tabFromPath]); // ✅ run when URL changes

  const resetForm = () => {
    setFormData({
      name: "", email: "", phone: "", department: "", campus: "",
      courses: "", qualification: "", experience: "",
      course: "", studentId: "", dateOfBirth: "", address: "",
      status: "Active",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (tab) => {
    window.history.pushState({}, "", `/registrations/${tab}`); // ✅ update URL
    setActiveTab(tab);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["name", "email", "campus"];
    if (activeTab === "principal") requiredFields.push("phone", "department");
    if (activeTab === "teacher") requiredFields.push("courses", "qualification");
    if (activeTab === "student") requiredFields.push("course", "studentId", "dateOfBirth");

    const missing = requiredFields.filter((field) => !formData[field]);
    if (missing.length > 0) {
      alert(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    const newRecord = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
    const storageKey = activeTab === "principal" ? "principals" : activeTab === "teacher" ? "teachers" : "students";
    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    localStorage.setItem(storageKey, JSON.stringify([...existing, newRecord]));

    alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} registered successfully!`);
    resetForm();
  };
  const onLogout = () => {
    localStorage.clear(); // or selectively clear auth tokens
    window.location.href = "/"; // Redirect to login page
  }

  return (
    <div className="registration">
      <Header onLogout={onLogout} />
      <div className="page-header">
        <h1>User Registration</h1>
        <p>Register new principals, teachers, and students</p>
      </div>

      {/* Tab Buttons */}
      <div className="registration-tabs">
        <button
          className={`tab-btn ${activeTab === "principal" ? "active" : ""}`}
          onClick={() => handleTabChange("principal")}
        >👔 Principal</button>

        <button
          className={`tab-btn ${activeTab === "teacher" ? "active" : ""}`}
          onClick={() => handleTabChange("teacher")}
        >👨‍🏫 Teacher</button>

        <button
          className={`tab-btn ${activeTab === "student" ? "active" : ""}`}
          onClick={() => handleTabChange("student")}
        >👨‍🎓 Student</button>
      </div>

      <div className="registration-form-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          {activeTab === "principal" && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Campus *</label>
                  <select
                    value={formData.campus}
                    onChange={(e) => handleInputChange("campus", e.target.value)}
                    required
                  >
                    <option value="">Select Campus</option>
                    <option value="Main campus">Main campus</option>
                    <option value="North campus">North campus</option>
                    <option value="South campus">South campus</option>
                    <option value="West campus">West campus</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Software Engineering">Software Engineering</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={(e) => handleInputChange("status", e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === "teacher" && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Courses/Subjects *</label>
                  <input
                    type="text"
                    placeholder="Enter courses or subjects"
                    value={formData.courses}
                    onChange={(e) => handleInputChange("courses", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Campus *</label>
                  <select
                    value={formData.campus}
                    onChange={(e) => handleInputChange("campus", e.target.value)}
                    required
                  >
                    <option value="">Select Campus</option>
                    <option value="Main campus">Main campus</option>
                    <option value="North campus">North campus</option>
                    <option value="South campus">South campus</option>
                    <option value="West campus">West campus</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Qualification *</label>
                  <input
                    type="text"
                    placeholder="Enter qualification"
                    value={formData.qualification}
                    onChange={(e) => handleInputChange("qualification", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input
                    type="number"
                    placeholder="Enter years of experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    min="0"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={(e) => handleInputChange("status", e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group"></div>
              </div>
            </>
          )}

          {activeTab === "student" && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Student ID *</label>
                  <input
                    type="text"
                    placeholder="Enter student ID"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange("studentId", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Campus *</label>
                  <select
                    value={formData.campus}
                    onChange={(e) => handleInputChange("campus", e.target.value)}
                    required
                  >
                    <option value="">Select Campus</option>
                    <option value="Main campus">Main campus</option>
                    <option value="North campus">North campus</option>
                    <option value="South campus">South campus</option>
                    <option value="West campus">West campus</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Course/Program *</label>
                  <select
                    value={formData.course}
                    onChange={(e) => handleInputChange("course", e.target.value)}
                    required
                  >
                    <option value="">Select Course</option>
                    <option value="Data Science Fundamentals">Data Science Fundamentals</option>
                    <option value="Machine Learning Applications">Machine Learning Applications</option>
                    <option value="Software Engineering Principles">Software Engineering Principles</option>
                    <option value="Cybersecurity Essentials">Cybersecurity Essentials</option>
                    <option value="Web Development Bootcamp">Web Development Bootcamp</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={(e) => handleInputChange("status", e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    placeholder="Enter full address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows="3"
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-actions">
            <button type="button" onClick={resetForm} className="reset-btn">
              Reset Form
            </button>
            <button type="submit" className="submit-btn">
              Register {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration
