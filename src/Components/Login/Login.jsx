import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './Login.css';

// --- Helper Functions ---
const getUsersFromLocalStorage = () => {
    try {
        const users = localStorage.getItem('intertech_users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error("Error parsing users from localStorage", error);
        return [];
    }
};

const saveUsersToLocalStorage = (users) => {
    try {
        localStorage.setItem('intertech_users', JSON.stringify(users));
    } catch (error) {
        console.error("Error saving users to localStorage", error);
    }
};

// --- Icons ---
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
);
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
);

// --- Role Selection ---
const RoleSelectionScreen = ({ onSelectRole }) => (
    <div className="role-selection-container">
        <h1 className="title">InterTech LMS</h1>
        <p className="subtitle">Please select your role to continue</p>
        <div className="role-button-group">
            {['Admin', 'Principal', 'Teacher'].map((role) => (
                <button key={role} onClick={() => onSelectRole(role)} className="role-button">
                    I am a {role}
                </button>
            ))}
        </div>
    </div>
);

// --- Auth Screen ---
const AuthScreen = ({ role, onBack, onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setError('');
        setSuccess('');
        setName('');
        setEmail('');
        setPassword('');
        if (role !== 'Admin') {
            setIsLoginView(true);
        }
    }, [role]);

    const handleSignup = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        const users = getUsersFromLocalStorage();
        if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
            setError("A user with this email already exists.");
            return;
        }
        const newUser = { name, email: email.toLowerCase(), password, role };
        saveUsersToLocalStorage([...users, newUser]);
        setSuccess("Account created! Please log in.");
        setIsLoginView(true);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        const users = getUsersFromLocalStorage();
        const foundUser = users.find(
            user => user.email.toLowerCase() === email.toLowerCase() &&
                    user.password === password &&
                    user.role === role
        );
        if (foundUser) {
            onLoginSuccess(foundUser);
        } else {
            setError(`Invalid credentials for a ${role}. Please try again.`);
        }
    };

    return (
        <div className="auth-container">
            <button onClick={onBack} className="back-button">
                <ArrowLeftIcon /> Back to Role Selection
            </button>
            <div className="form-container">
                <h1 className="form-title">
                    {role === 'Admin' ? 'Admin Login' : `${role} ${isLoginView ? 'Login' : 'Signup'}`}
                </h1>
                <p className="form-subtitle">
                    Access the {role} dashboard <br />
                    Email: admin@intertech.com <br />
                    Pass: admin123
                </p>

                <form onSubmit={isLoginView || role === 'Admin' ? handleLogin : handleSignup} className="form">
                    {!isLoginView && role !== 'Admin' && (
                        <div className="input-wrapper">
                            <UserIcon />
                            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
                        </div>
                    )}
                    <div className="input-wrapper">
                        <MailIcon />
                        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
                    </div>
                    <div className="input-wrapper">
                        <LockIcon />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <button type="submit" className="submit-button">
                        {isLoginView || role === 'Admin' ? 'Log In' : 'Create Account'}
                    </button>
                </form>

                {role !== 'Admin' && (
                    <p className="toggle-text">
                        {isLoginView ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLoginView(!isLoginView)} className="toggle-button">
                            {isLoginView ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

// --- Main Component (Login Page) ---
export default function LoginPage() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        const users = getUsersFromLocalStorage();
        const adminExists = users.some(user => user.role === 'Admin');
        if (!adminExists) {
            const adminUser = { name: 'Default Admin', email: 'admin@intertech.com', password: 'admin123', role: 'Admin' };
            saveUsersToLocalStorage([...users, adminUser]);
        }
    }, []);

    const handleLoginSuccess = (user) => {
        sessionStorage.setItem('intertech_loggedInUser', JSON.stringify(user));
        navigate('/dashboard');
    };

    return (
        <Layout hideSidebar={true}>
            <div className="app-container">
                {selectedRole ? (
                    <AuthScreen role={selectedRole} onBack={() => setSelectedRole(null)} onLoginSuccess={handleLoginSuccess} />
                ) : (
                    <RoleSelectionScreen onSelectRole={setSelectedRole} />
                )}
            </div>
        </Layout>
    );
}
