import React from "react";
import { navLink } from "../constants";
const Navbar = () => {
  return (
    <div className="flex w-full navbar justify-between  top-0">
      <div className="flex items-center">
        <img src="logo.png" alt="Logo" className="px-2" />
        <span>StreamWeb</span>
      </div>
      <div className="flex items-center">
        <ul className="flex list-none justify-end flex-1 px-3">
          {navLink.map((nav, index) => (
            <li key={index} className="px-3">
              <a href={nav.href}>{nav.lable}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
