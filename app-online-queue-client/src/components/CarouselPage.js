import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel'
import logo from "../../public/assets/u77.svg";
import CustomerLayout from "./CustomerLayout";
import {Button, Col, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation"
import image from "../../public/assets/ipoteka.jpg"
import image1 from "../../public/assets/hamkor.jpg"
import {connect} from "dva";

@connect(({globalModel}) => ({globalModel}))
class CarouselPage extends Component {
  render() {
    // const opts = {
    //
    //
    //   const login = (e, v) => {
    //     this.props.dispatch({
    //       type: 'globalModel/loginPhoneNumber',
    //       payload: {
    //         ...v
    //       }
    //     })
    //   }
    // };


    return (
      <div className="carouselPage">

        <Col md={{size: 10, offset: 2}} className="mt-5">
          <Carousel>
            <Carousel.Item>

              <Row>
                <Col md="8">
                  <img src={logo} alt="" className="img-fluid" width="800px" height="500px"/>
                </Col>

                <Col md="3">
                  <h1>Endi <br/> Navbat <br/>Kutish yo'q</h1>
                  <p>Navbat kutishingizga xojat yo’q, OnlineNavbat orqali navbatga yoziling va vaqtingizni tejang.
                  </p>
                  <AvForm>
                    <AvField name="phoneNumber" placeholder="Telefon Raqam"/>
                    <Button color="primary">Navbatga yozilish</Button>
                  </AvForm>
                </Col>
              </Row>


            </Carousel.Item>

            {/*<Carousel.Item>*/}
            {/*//   <Row>*/}
            {/*//     <Col md={{size: 5, offset: 1}}>*/}
            {/*      <h1>Online Navbat haqida</h1>*/}
            {/*      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolor esse exercitationem*/}
            {/*        neque nesciunt nostrum, recusandae? Beatae cupiditate dicta dignissimos eos, impedit ipsam iusto*/}
            {/*        optio pariatur, praesentium quibusdam sit voluptas.</p>*/}
            {/*      <Button color="primary">Batafsil</Button>*/}
            {/*    </Col>*/}

            {/*    <Col md="6">*/}
            {/*      <YouTube*/}
            {/*        videoId="2g811Eo7K8U"*/}
            {/*        opts={opts}*/}
            {/*        onReady={this._onReady}*/}
            {/*      />*/}
            {/*    </Col>*/}
            {/*  </Row>*/}
            {/*</Carousel.Item>*/}
          </Carousel>
        </Col>


        <Row>
          <Col md="2" className="newCard">
            <h3 className="text-center">New Company</h3>
            <div className="card border-0">
              <div className="card-img">
                <img src={image} alt="" className="img-fluid"/>
              </div>
              <div className="card-body">
                <h4 className="card-title">Imzo</h4>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident,
                  soluta?</p>
                <a href="#" className="btn btn-primary">See Company</a>
              </div>
            </div>
          </Col>
          <Col md="10" className="mt-5 ">
            <h1>Banklar</h1>
            <Carousel>

              <Carousel.Item>

                <Col md="12">

                  <Row>
                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Ipoteka Bank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>

                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Ipoteka Bank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>

                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Ipoteka Bank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>
                  </Row>

                  <Row>
                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Ipoteka Bank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>

                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Ipoteka Bank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>

                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Ipoteka Bank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>
                  </Row>

                </Col>

              </Carousel.Item>

              <Carousel.Item>

                <Col md="12">

                  <Row>
                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image1} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Universalbank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>

                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image1} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Universalbank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>

                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image1} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Universalbank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>
                  </Row>

                  <Row>
                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image1} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Universalbank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>

                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image1} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Universalbank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>

                    <div className="col-md-4">
                      <div className="card border-0">
                        <div className="card-img">
                          <img src={image1} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-img-overlay text-center">
                          <h5 className="text-white font-family-Regular">Universalbank</h5>
                          <div className="rate mx-5">
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label htmlFor="star1" title="text">1 star</label>
                          </div>
                          <Button className="btn text-white py-1 mt-4" color="primary">Navbatga yozilish</Button>
                        </div>
                      </div>

                    </div>
                  </Row>


                </Col>

              </Carousel.Item>


            </Carousel>
          </Col>

        </Row>


      </div>
    );
  }
}

CarouselPage.propTypes = {};

export default CarouselPage;
