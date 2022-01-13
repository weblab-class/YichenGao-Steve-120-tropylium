import React, { useState } from "react";
import "./NavBar.css"

const NavBar = () => {
    return (
    <div className="navbar-container">
        <img className="navbar-logo" src="https://scontent-bos3-1.xx.fbcdn.net/v/t1.15752-9/271532142_298756832318180_7948055979511906229_n.jpg?_nc_cat=104&cb=c578a115-c1c39920&ccb=1-5&_nc_sid=ae9488&_nc_ohc=sXYfrYnYATwAX8gDowh&tn=c6zU8iltZVUtHkQg&_nc_ht=scontent-bos3-1.xx&oh=03_AVJe43HJ51E0p8OAqaNMiOErAX76Lec5QWXlNcmGcfGldw&oe=620657BF"/>
        <h1 className="navbar-linktext">Create</h1>
        <h1 className="navbar-linktext">My Artworks</h1>
        <h1 className="navbar-linktext">Gallery</h1>
    </div> );
};

export default NavBar;