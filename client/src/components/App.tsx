import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";

import NavBar from "./modules/NavBar";
import ArtCreator from "./pages/ArtCreator";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";

const App = () => {
  const [userId, setUserId] = useState<String>(undefined);

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // They are registed in the database and currently logged in.
          setUserId(user._id);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      );
  }, []);

  const handleLogin = (res: GoogleLoginResponse) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user: User) => {
      setUserId(user._id);
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  return (
    <>
      <NavBar />
      <Router>
        <Home
          path="/"
          handleLogin={
            handleLogin as (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void
          }
          handleLogout={handleLogout}
          userId={userId}
        />
        <ArtCreator path="/fractal" />
        <Dashboard path="/dashboard" />
        <Account path="/account" />
        <NotFound default={true} />
      </Router>
    </>
  );
};

export default App;
