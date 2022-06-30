import React from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from '@components/navbar/navbar.component';

const Dashboard = () => {
 return (
  <div>
   <Navbar />
   <div className="container">
    <div className="section">
     <Outlet />
    </div>
   </div>
  </div>
 );
};

export default Dashboard;
