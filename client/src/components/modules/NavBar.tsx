import React, { MouseEventHandler, useState } from "react";
import { Link } from "@reach/router";

import "./NavBar.css";
import logo_transparent from '../../images/logo_transparent.png';
import menu_icon from '../../images/menu_icon.svg'
type NavBarProps = {

}

const NavBar = (props: NavBarProps) => {
    const [menuShown, setMenuShown] = useState<boolean>(true);
    const onMenuClick = (event) => {
        setMenuShown(!menuShown);
    }

    window.matchMedia("(max-width:600px)")
        .addEventListener('change', (event: MediaQueryListEvent) => {
            setMenuShown(!event.matches);
        });
        
    return (
    <nav className="navbar-container">
        <div className="navbar-logo">
            <img className="navbar-logo-icon" src = {logo_transparent}/>
        </div>
        <div className={`navbar-list ${menuShown ? "" : "inactive"}`}>
            <Link to="/fractal" className="navbar-linktext">Create</Link>
            <Link to="/dashboard" className="navbar-linktext">My Artworks</Link>
            <Link to="/" className="navbar-linktext">Gallery</Link>
            <Link to="/" className="navbar-linktext">Account</Link>
        </div>
        <div className="navbar-menu" onClick={onMenuClick}>
            <img className="navbar-menu-icon filter-white" src = {menu_icon}/>
        </div>
    </nav>);
};

export default NavBar;