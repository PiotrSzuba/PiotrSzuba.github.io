import React from 'react';
import './navbar.scss'
import { NavLink } from "react-router-dom";
//
//
//
const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="force-left">
                    <NavLink className="navbar-link " to="/">Home</NavLink>
                    <NavLink className="navbar-link " to="/AddAdvert">Add advert</NavLink>
                    <NavLink className="navbar-link " to="/FindGroup">Find group</NavLink>
                    <NavLink className="navbar-link " to="/AddGroup">Add group</NavLink>
                </div>
                <div className="force-right">
                    <a className="navbar-link logo-font" href="https://github.com/PiotrSzuba">Szuba</a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;