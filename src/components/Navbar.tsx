import React from 'react';
import logo from '../assets/logo.svg';

const Navbar: React.FC = () => {
  return (
    <div className="flex gap-2 p-4">
      <img src={ logo } className='w-24' />
      <h2 className="text-xl pb-1">explorer</h2>
      <div className='flex gap-8 ml-8'>
        <a href='/'>Overview</a>
        <a href='/analytics'>Analytics</a>
      </div>
    </div>
  );
};

export default Navbar;
