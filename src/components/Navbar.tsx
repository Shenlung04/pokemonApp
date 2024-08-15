import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="/pokeball.png" alt="Pokemon Logo" />
      </Link>
    </nav>
  );
};

export default Navbar;
