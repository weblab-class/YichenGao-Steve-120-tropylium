import React, { MouseEventHandler, useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { Link } from "@reach/router";

import "./NavBar.css";
import logo_transparent from "../../images/white_name_logo.png";
import menu_icon from "../../images/menu_icon.svg";

const GOOGLE_CLIENT_ID = "345260256672-4hgaortvbdeb0t3mb8iuphdvehej9m14.apps.googleusercontent.com";

type NavBarProps = {
  userId: String;
  handleLogin: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  handleLogout: () => void;
};

const NavBar = (props: NavBarProps) => {
  const [menuShown, setMenuShown] = useState<boolean>(true);
  const onMenuClick = (event) => {
    setMenuShown(!menuShown);
  };

  window
    .matchMedia("(max-width:600px)")
    .addEventListener("change", (event: MediaQueryListEvent) => {
      setMenuShown(!event.matches);
    });

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-linktext">
        <div className="navbar-logo">
          <img className="navbar-logo-icon" src={logo_transparent} />
        </div>
      </Link>
      <div className={`navbar-list ${menuShown ? "" : "inactive"}`}>
        <Link to="/fractal_creator" className="navbar-linktext">
          Create
        </Link>
        <Link to="/dashboard" className="navbar-linktext">
          My Artworks
        </Link>
        <Link to="/gallery" className="navbar-linktext">
          Gallery
        </Link>
        <Link to="/account" className="navbar-linktext">
          Account
        </Link>
        {props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={() => console.log(`Failed to logout.`)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </div>
      <div className="navbar-menu" onClick={onMenuClick}>
        <img className="navbar-menu-icon filter-white" src={menu_icon} />
      </div>
    </nav>
  );
};

export default NavBar;
