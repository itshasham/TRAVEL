import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Admin_css/main_admin.css'; // Import your CSS file for styling

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing tokens)
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h1 className="sidebar-title">Admin Dashboard</h1>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/add-trip" className="sidebar-item">Add New Trip</NavLink>
          </li>
          <li>
            <NavLink to="/update-trip" className="sidebar-item">Update Trip</NavLink>
          </li>
          <li>
            <NavLink to="/delete-trip" className="sidebar-item">Delete Trip</NavLink>
          </li>
          <li>
            <NavLink to="/manage-accessories" className="sidebar-item">Manage Accessories</NavLink>
          </li>
          <li>
            <NavLink to="/weather-report" className="sidebar-item">Weather Report</NavLink>
          </li>
        </ul>
        
      </div>

      <div className="main-content">
        <h2>Welcome to the Admin Dashboard</h2>
        {/* Additional content can go here */}
      </div>
    </div>
  );
};

export default AdminPage;
