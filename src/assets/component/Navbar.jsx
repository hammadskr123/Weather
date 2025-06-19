import React from 'react';
import { MdLocationOn } from 'react-icons/md';

const Navbar = ({ city, country }) => {
  return (
    <div>
    
    <nav className="navbar">
      <span className="navbar-title">Weather App</span>
      {city && country && (
        <span className="navbar-location">
          <MdLocationOn className="location-icon" />
          {city}, {country}
        </span>
      )}
    </nav>
   </div>
  )
}

export default Navbar
