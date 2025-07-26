// src/Components/Header/Header.jsx
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/uploadlessonsplans", label: "Courses" },
    { path: "/managestudents", label: "Students" },
    { path: "/manageteachers", label: "Teachers" },
    { path: "/settings", label: "Settings" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="top-header">
      {!isMobile && (
        <nav className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`nav-btn ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}

      <div className="user-profile">
        <div
          className="user-avatar"
          onClick={() => setDropdownOpen((prev) => !prev)}
          title="Settings / Logout"
        >
          <img src="https://i.pravatar.cc/30?img=3" alt="Admin" />
        </div>

        {dropdownOpen && (
          <div className="dropdown">
            {isMobile && (
              <>
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                  >
                    {item.label}
                  </button>
                ))}
                <hr />
              </>
            )}
            <button onClick={() => navigate("/settings")}>⚙️ Settings</button>
            <button onClick={onLogout}>🚪 Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
