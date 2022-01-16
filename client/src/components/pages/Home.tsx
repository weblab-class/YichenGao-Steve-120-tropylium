import React, { MouseEventHandler, useState } from "react";
import "./Home.css";
import { RouteComponentProps } from "@reach/router";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import logo_blue from "../../images/blue_name_logo.png";
import logo_red from "../../images/red_name_logo.png";
import fractal_example1 from "../../images/fractal_example1.png";
import fractal_example2 from "../../images/fractal_example2.png";

type HomeProps = RouteComponentProps;

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
                            <div className="centerImage">
                              <img className="navbar-logo-icon" height="240" width="700" src={logo_blue} />
                              <h3>Create Your Fractal Art in just a few steps.</h3>
                              <p>Log in to turn your imaginamtion into reality.</p>
                            </div>

                          </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                          <img
                              className="d-block w-100"
                              src={fractal_example2}
                              alt="Second slide"
                          />

                          <Carousel.Caption>
                          <div className="centerImage">
                              <img className="navbar-logo-icon" height="240" width="700" src={logo_red} />
                              <h3>Create Your Fractal Art in just a few steps.</h3>
                              <p>Log in to turn your imaginamtion into reality.</p>
                            </div>
                          </Carousel.Caption>
                      </Carousel.Item>
                      
                  </Carousel>
              </Col>
          </Row>
      </Container>

  );
};


export default Home;
