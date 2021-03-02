import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Carousel from "react-bootstrap/Carousel";
import {Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import phoneImg from "../../public/assets/iphonexmockup.png"
import * as ReactDOM from "react-dom";

class StaticComponents extends Component {
  render() {

    const recaptchaRef = React.createRef();

    const opts = {
      height: '390',
      width: '600',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    return (
      <div className="staticComponents">
        <Carousel className="carousel">
          <Carousel.Item className="items">
            <Row className="rows">
              <Col className="col-md-5">
                <img
                  className="d-block images"
                  src={phoneImg}
                  alt="First slide"
                />
              </Col>
              <Col className="col-md-7 aa">
                <div className="texts">
                  <h1>Bu qanday ishlaydi?</h1>
                  <br/>
                  <h2>1-qadam: Online Navbat Mobil</h2>
                  <br/>
                  <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                    gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
                    Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla
                    luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</h4>
                </div>
                <div className="bb">
                  <a href="#" target="_blank"><span>Boshlash</span></a>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item className="items">
            <Row className="rows">
              <Col className="col-md-5">
                <img
                  className="d-block images"
                  src={phoneImg}
                  alt="First slide"
                />
              </Col>
              <Col className="col-md-7 aa">
                <div className="texts">
                  <h1>Bu qanday ishlaydi?</h1>
                  <br/>
                  <h2>1-qadam: Online Navbat Mobil</h2>
                  <br/>
                  <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                    gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
                    Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla
                    luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</h4>
                </div>
                <div className="bb">
                  <a href="#" target="_blank"><span>Boshlash</span></a>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item className="items">
            <Row className="rows">
              <Col className="col-md-5">
                <img
                  className="d-block images"
                  src={phoneImg}
                  alt="First slide"
                />
              </Col>
              <Col className="col-md-7 aa">
                <div className="texts">
                  <h1>Bu qanday ishlaydi?</h1>
                  <br/>
                  <h2>1-qadam: Online Navbat Mobil</h2>
                  <br/>
                  <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                    gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
                    Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla
                    luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</h4>
                </div>
                <div className="bb">
                  <a href="#" target="_blank"><span>Boshlash</span></a>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
        <Container className="mt-5">
          <div className="form-footer">
            <Row>
              <Col md="6 section">
                <div className="google-map">
                </div>
              </Col>
              <Col md="6 section">
                <div className="form">
                  <h1 className="text">Contact</h1>
                  <hr className="hr"/>
                  <Form>
                    <FormGroup>
                      <Label for="name">Ism</Label>
                      <Input placeholder="Ismingizni kiriting"/>
                      <FormFeedback>You will not be able to see this</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input placeholder="Elektron pochtangizni kiriting"/>
                      <FormFeedback>You will not be able to see this</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="phoneNumber">Telefon raqam</Label>
                      <Input placeholder="Telefon raqamingizni kiriting"/>
                      <FormFeedback>You will not be able to see this</FormFeedback>
                    </FormGroup>
                  </Form>
                    <Button color="primary" className="mr-auto">Submit</Button>

                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

StaticComponents.propTypes = {};

export default StaticComponents;
