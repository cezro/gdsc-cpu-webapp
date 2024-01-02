import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

export default function AdminHome() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/admin/admin-home')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    setHoveredButton(button);
  };

  const handleButtonHover = (button: string) => {
    setHoveredButton(button);
  };

  const handleButtonLeave = () => {
    setHoveredButton(null);
  };

  return (
    <Layout>
      <div className="my-7">
        <h1 className="text-stone-900 text-5xl">Dashboard</h1>
      </div>
      <div className="flex flex-row bg-slate-500 h-14 w-80 text-center justify-center items-center rounded-md space-x-3">
        <div
          className={`w-24 h-8 cursor-pointer flex items-center justify-center rounded-md ${
            activeButton === 'Overview' || hoveredButton === 'Overview'
              ? 'bg-gray-800'
              : ''
          }`}
          onClick={() => handleButtonClick('Overview')}
          onMouseEnter={() => handleButtonHover('Overview')}
          onMouseLeave={handleButtonLeave}
        >
          <p className="text-slate-300 hover:text-white">Overview</p>
        </div>
        <div
          className={`w-16 h-8 cursor-pointer flex items-center justify-center rounded-md ${
            activeButton === 'Users' || hoveredButton === 'Users'
              ? 'bg-gray-800'
              : ''
          }`}
          onClick={() => handleButtonClick('Users')}
          onMouseEnter={() => handleButtonHover('Users')}
          onMouseLeave={handleButtonLeave}
        >
          <p className="text-slate-300 hover:text-white">Users</p>
        </div>
        <div
          className={`w-24 h-8 cursor-pointer flex items-center justify-center rounded-md ${
            activeButton === 'Analytics' || hoveredButton === 'Analytics'
              ? 'bg-gray-800'
              : ''
          }`}
          onClick={() => handleButtonClick('Analytics')}
          onMouseEnter={() => handleButtonHover('Analytics')}
          onMouseLeave={handleButtonLeave}
        >
          <p className="text-slate-300 hover:text-white">Analytics</p>
        </div>
      </div>
    </Layout>
  );
}
