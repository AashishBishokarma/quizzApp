import React from 'react';
import bg from '../assets/background.png'; // adjust the path if needed

const Layout = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
