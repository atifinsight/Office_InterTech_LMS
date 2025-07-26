import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children, hideSidebar }) => {
  // Fallback to session check only if hideSidebar is not explicitly passed
  const loggedInUser = sessionStorage.getItem('intertech_loggedInUser');
  const shouldHideSidebar = hideSidebar ?? !loggedInUser;

  return (
    <div style={{ display: 'flex' }}>
      {!shouldHideSidebar && <Sidebar />} {/* Show sidebar only if logged in */}
      <div style={{ flex: 1, padding: '1rem' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
