import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import "./Home.css";
import { RouteComponentProps } from "@reach/router";

const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";
type HomeProps = RouteComponentProps & {
  userId: String;
  handleLogin: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  handleLogout: () => void;
};
const Home = (props: HomeProps) => {
  return (
    <div className="home-container">
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
      <h1>Fractory will win- Alex Dang Yichen Gao Steven Reyes</h1>
      <h2> What we provide in this skeleton</h2>
      <ul>
        <li>Google Auth (Skeleton.js & auth.js)</li>
        <li>Socket Infrastructure (client-socket.js & server-socket.js)</li>
        <li>User Model (auth.js & user.js)</li>
      </ul>
      <h2> What you need to change</h2>
      <ul>
        <li>Change the font in utilities.css</li>
        <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
        <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>
        <li>Change the Database SRV for Atlas (server.js)</li>
        <li>Change the Database Name for MongoDB (server.js)</li>
        <li>Add a favicon to your website at the path client/dist/favicon.ico</li>
        <li>Update website title in client/dist/index.html</li>
      </ul>
    </div>
  );
};

export default Home;
