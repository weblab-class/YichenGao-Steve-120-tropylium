import React from "react";
import "./Home.css";
import { RouteComponentProps } from "@reach/router";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type HomeProps = RouteComponentProps;

//const Home = (props: HomeProps) => {
const Home = (props: HomeProps) => {
  return (
      <Container fluid>
          <Row>
              <Col>
                  <Carousel fade>
                      <Carousel.Item>
                          <img
                              className="d-block w-100"
                              src="https://via.placeholder.com/300"
                              alt="First slide"
                          />
                          <Carousel.Caption>
                              <h3>First slide label</h3>
                              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                          </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                          <img
                              className="d-block w-100"
                              src="https://via.placeholder.com/300"
                              alt="Second slide"
                          />

                          <Carousel.Caption>
                              <h3>Second slide label</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                          <img
                              className="d-block w-100"
                              src="https://via.placeholder.com/300"
                              alt="Third slide"
                          />

                          <Carousel.Caption>
                              <h3>Third slide label</h3>
                              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                          </Carousel.Caption>
                      </Carousel.Item>
                  </Carousel>
              </Col>
          </Row>
      </Container>

  );
};


export default Home;
