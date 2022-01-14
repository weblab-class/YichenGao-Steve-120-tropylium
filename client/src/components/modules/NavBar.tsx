import React, { MouseEventHandler, useState } from "react";

import "./NavBar.css";
//import logo_transparent from '../../images/logo_transparent.png';

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
            <img className="navbar-logo-icon" src = {"https://scontent-bos3-1.xx.fbcdn.net/v/t1.15752-9/271392189_5036392723072179_1105063127099927337_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=A3j4cHRQpscAX-c6qw5&_nc_ht=scontent-bos3-1.xx&oh=03_AVIJQHfa-1zJj6MyuxVaIMQz53ax_DiDNzyrJP0t6a-L3Q&oe=6205FAF8"}/>
        </div>
        <div className={`navbar-list ${menuShown ? "" : "inactive"}`}>
            <div className="navbar-linktext">Create</div>
            <div className="navbar-linktext">My Artworks</div>
            <div className="navbar-linktext">Gallery</div>
            <div className="navbar-linktext">Account</div>
        </div>
        <div className="navbar-menu" onClick={onMenuClick}>
            !MenuIcon!
        </div>
    </nav>);
};

export default NavBar;