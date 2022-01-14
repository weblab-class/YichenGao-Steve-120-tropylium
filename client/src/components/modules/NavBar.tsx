import React from "react";

import "./NavBar.css"

type NavBarProps = {

}

const NavBar = (props: NavBarProps) => {
    return (
    <nav className="navbar-container">
        <div className="navbar-logo">
            Logo
        </div>
        <ul className="navbar-list">
            <li className="navbar-linktext">Create</li>
            <li className="navbar-linktext">My Artworks</li>
            <li className="navbar-linktext">Gallery</li>
            <li className="navbar-linktext">Account</li>
        </ul>
    </nav>)
};

export default NavBar;