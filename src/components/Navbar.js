import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

/**
 * Navbar component displaying navigation options.
 * @param {Object} props - Component properties.
 * @param {Function} props.PostJobClicked - Callback function for handling post job click event.
 * @returns {JSX.Element} - JSX element representing the navbar component.
 */
const Navbar = ({ PostJobClicked }) => {
  return (
    <nav className="NavBar-Container">
      <ul className="NavBar">
        <li className='NavBar_PostJob' onClick={PostJobClicked}>
         <span> <FaEdit  /> Post Job </span>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
