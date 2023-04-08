import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">F a r m S t a c k</Link>
        </div>
        <div className={`navbar-menu ${isOpen ? "is-active" : ""}`}>
          <Link to="/feed">Get Started</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </div>
        <div className="navbar-burger" onClick={() => setOpen(!isOpen)}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;