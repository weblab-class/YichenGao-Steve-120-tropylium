import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";

import "./App.css";
import NavBar from "./modules/NavBar";
import ArtCreator from "./pages/ArtCreator";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Dtest from "./pages/Dtest";
import FractalCreator from "./pages/FractalCreator";
import PixiTest from "./pages/PixiTest";

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

  // render() {
  //   return (
  //     <>
  //       <Router>
  //         <Home
  //           path="/"
  //           handleLogin={this.handleLogin}
  //           handleLogout={this.handleLogout}
  //           loggedIn={this.state.loggedIn}
  //           userId={this.state.userId}
  //           loggedOut={this.state.loggedOut}
  //           resetLogout={this.state.resetLogout}
  //         />
  //         <FractalCreator
  //           path="/create/"
  //           userId={this.state.userId}
  //           loggedIn={this.state.loggedIn}
  //           userId={this.state.userId}
  //           handleLogin={this.handleLogin}
  //           handleLogout={this.handleLogout}
  //           loggedOut={this.state.loggedOut}
  //           loadId={this.state.loadId}
  //           resetLoadId={this.resetLoadId}
  //           name={this.state.name}
  //           handleSave={this.handleSave}
  //           savedImages={this.state.savedImages}


  //         />
  //         <Dashboard
  //           path="/play/"
  //           userId={this.state.userId}
  //           loggedIn={this.state.loggedIn}
  //           userId={this.state.userId}
  //           handleLogin={this.handleLogin}
  //           handleLogout={this.handleLogout}
  //           loggedOut={this.state.loggedOut}

  //         />
  //         <Gallery
  //           path="/gallery/"
  //           userId={this.state.userId}
  //           loggedIn={this.state.loggedIn}
  //           handleLogin={this.handleLogin}
  //           handleLogout={this.handleLogout}
  //           loggedOut={this.state.loggedOut}
  //           handleClick={this.handleClick}
  //           name={this.state.name}
  //           handleDelete={this.handleDelete}
  //           numCreated={this.state.numCreated}

  //         />
          
    //       <NotFound default />
    //     </Router>
    //   </>
    // );

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  return (
    <div className="App-container">
      <div className="App-navbar">
        <NavBar
          handleLogin={
            handleLogin as (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void
          }
          handleLogout={handleLogout}
          userId={userId}
        />
      </div>
      <Router className="App-content">
        <Home path="/" />
        <ArtCreator path="/fractal_creator" userId={userId} />
        <Dashboard path="/dashboard" userId={userId} />
        <Account path="/account" />
        <Dtest default={true} />
        <FractalCreator path="/create" is_new_project={false} />
        <PixiTest path="/pixitest" />
      </Router>
    </div>
  );
};

export default App;
