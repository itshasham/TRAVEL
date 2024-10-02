import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from '../assets/images/p1.png';
import { useAuth } from "../store/token";

const Navbar = () => {
  const { isLoggedIn, d1 } = useAuth(); // Destructure d1 from useAuth

  return (
    <header className="navbar-header">
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">
            <img src={logo} alt="logo" className="logo-image" />
          </NavLink>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink to="/"> Home </NavLink>
            </li>
            <li>
              <NavLink to="/about"> About </NavLink>
            </li>
            <li>
              <NavLink to="/services"> Services </NavLink>
            </li>
            {isLoggedIn ? ( // Check if the user is logged in
              <>
                
                <li>
                  <NavLink to="/logout"> Logout </NavLink>
                </li>
                <li>
                  <NavLink to="/contactus"> Contact </NavLink>
                </li>
                {d1[0] && ( // Check if d[0] is true for admin access
                  <li>
                    <NavLink to="/admin"> Admin </NavLink>
                  </li>
                )}
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register"> Register </NavLink>
                </li>
                <li>
                  <NavLink to="/login"> Login </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
