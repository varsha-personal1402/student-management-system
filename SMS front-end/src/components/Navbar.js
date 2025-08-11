import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // import the styles

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="custom-navbar">
      <div className="nav-container">
        <div className="brand">
          <Link to="/">Student<span className="highlight">MS</span></Link>
        </div>

        <div className={`links ${open ? 'open' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Dashboard
          </NavLink>
          <NavLink to="/student-list" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Students
          </NavLink>
          <NavLink to="/add-student" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Add Students
          </NavLink>
        </div>

        <div className="actions">
          <div className="profile">
            <div className="avatar">JD</div>
            <div className="name">Profile</div>
          </div>
          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
