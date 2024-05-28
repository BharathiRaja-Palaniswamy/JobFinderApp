import React from 'react';
import { FaEdit } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Navbar = ({PostJobClicked}) => {
  return (
    <nav className='NavBar-Container'>
      <ul className='NavBar'>
        <li><FaEdit onClick = {PostJobClicked} style={{cursor: 'pointer'}}/></li>
        <li><FaUser /></li>
      </ul>
    </nav>
  );
};

export default Navbar;
