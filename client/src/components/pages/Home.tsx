import React, { MouseEventHandler, useState } from "react";
import "./Home.css";
import { RouteComponentProps } from "@reach/router";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import logo_colored from "../../images/colored_name_logo.png";
import fractal_example1 from "../../images/fractal_example1.png";
import fractal_example2 from "../../images/fractal_example1.png";

// import GoogleLogin, {
//   GoogleLoginResponse,
//   GoogleLoginResponseOffline,
//   GoogleLogout,
// } from "react-google-login";
// import { Link } from "@reach/router";
// const GOOGLE_CLIENT_ID = "345260256672-4hgaortvbdeb0t3mb8iuphdvehej9m14.apps.googleusercontent.com";

type HomeProps = RouteComponentProps;
// type NavBarProps = {
//   userId: String;
//   handleLogin: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
//   handleLogout: () => void;
// };

const Home = (props: HomeProps) => {
  return (
      <Container fluid>
          <Row>
              <Col>
                  <Carousel fade>
                      <Carousel.Item>
                          <img
                              className="d-block w-100"
                              src= {fractal_example1}
                              alt="First slide"
                          />
                          <Carousel.Caption>
                              <img className="navbar-logo-icon" src={logo_colored} />
                              <h3>Create Your Fractal Art in just a few steps.</h3>
                              <p>Log in to start your journey to imaginamtion.</p>

                              {/* {props.userId ? (
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
                              )} */}
                          </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                          <img
                              className="d-block w-100"
                              src={fractal_example2}
                              alt="Second slide"
                          />

                          <Carousel.Caption>
                              <img className="navbar-logo-icon" src={logo_colored} />
                              <h3>Create Your Fractal Art in just a few steps.</h3>
                              <p>Log in to start your journey to imaginamtion.</p>
                          </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                          <img
                              className="d-block w-100"
                              src={fractal_example1}
                              alt="Third slide"
                          />

                          <Carousel.Caption>
                              <img className="navbar-logo-icon" src={logo_colored} />
                              <h3>Create Your Fractal Art in just a few steps.</h3>
                              <p>Log in to start your journey to imaginamtion.</p>
                          </Carousel.Caption>
                      </Carousel.Item>
                  </Carousel>
              </Col>
          </Row>
      </Container>

  );
};


export default Home;
