import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './Components/Layout/Layout';
import Dashboard from './Components/Dashbaord/Dashboard';
import ManagePrincipals from './Components/ManagePrincipals/ManagePrincipals';
import ManageStudents from './Components/ManageStudents/ManageStudents';
import ManageTeachers from './Components/ManageTeachers/ManageTeachers';
import Notifications from './Components/Notifications/Notifications';
import Registrations from './Components/Registrations/Registrations';
import PrincipalForm from './Components/Registrations/Registrations';
import TeacherForm from './Components/Registrations/Registrations';
import StudentForm from './Components/Registrations/Registrations';
import Reports from './Components/Reports/Reports';
import Settings from './Components/Settings/Settings';
import Help from './Components/Help/Help';
import Login from './Components/Login/Login';
import UploadLessonsPlans from './Components/UploadLessonsPlans/UploadLessonsPlans';

function App() {
  return (
    <Router>
      <Routes>

        {/* ❌ NO layout for Login */}
        <Route path="/" element={<Login />} />

        {/* ✅ Protected routes WITH Layout */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/manageprincipals" element={<Layout><ManagePrincipals /></Layout>} />
        <Route path="/managestudents" element={<Layout><ManageStudents /></Layout>} />
        <Route path="/manageteachers" element={<Layout><ManageTeachers /></Layout>} />
        <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/help" element={<Layout><Help /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/uploadlessonsplans" element={<Layout><UploadLessonsPlans /></Layout>} />

        {/* Registrations with Nested Routes inside Layout */}
        <Route path="/registrations" element={<Layout><Registrations /></Layout>}>
          <Route path="principal" element={<PrincipalForm />} />
          <Route path="teacher" element={<TeacherForm />} />
          <Route path="student" element={<StudentForm />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
