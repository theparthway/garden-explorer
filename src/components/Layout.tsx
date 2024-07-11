import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen font-satoshi bg-white">
      <header className="">
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
