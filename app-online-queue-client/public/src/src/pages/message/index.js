import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "dva";
import {Col, Row, Container, Button, CardFooter, CardHeader, Table, CustomInput, Card, CardBody} from "reactstrap";
import DashboardLayout from "../../components/DashboardLayout";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {DiVim} from "react-icons/all";
import {Nav, TabContent} from "react-bootstrap";

@connect(({messageModel}) => ({messageModel}))
class Index extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'messageModel/getMessages'
    })
  }


  render() {
    const {dispatch, messageModel} = this.props;
    const {views, unViews, isOpen} = messageModel;


    const isViewChange = (e) => {
      dispatch({
        type: 'messageModel/isViewChange',
        payload: {
          id: e
        },
      });
    };


    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <Container className="ml-md-3 ml-2">
            <Row>
              <Col className="text-center">
                <h1>Messages</h1>
              </Col>
            </Row>

            <Tab.Container id="left-tabs-example" defaultActiveKey="unView">
              <Row>
                <Col md={12}>
                  <Nav variant="pills" className="flex-column">
                    <Row>
                      <Nav.Item>
                        <Nav.Link eventKey="view">O'qilganlar</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="unView">Ko'rilmaganlar</Nav.Link>
                      </Nav.Item>
                    </Row>
                  </Nav>
                </Col>
                <Col>
                  <Tab.Content>
                    <Tab.Pane eventKey="view">

                      {views.length > 0 ?
                        <div>
                          {views.map((item, i) =>
                            <Row className="my-md-4 my-1" key={i + 1}>
                              <Col className="col-md-8 col-12">
                                <Card>
                                  <div>
                                    <CardHeader className="bg-success">
                                      <h6 className="text-white">O'qilgan</h6>
                                      <h6
                                        className="text-white">{item.createdAt.substring(0, 10) + ` da yuborilgan`}</h6>
                                    </CardHeader>
                                    <CardBody>
                                      <h6><i> {item.messageText}</i></h6>
                                    </CardBody>
                                    <CardFooter>
                                      <Button disabled={true}>
                                        O'qilgan
                                      </Button>
                                    </CardFooter>
                                  </div>
                                </Card>
                              </Col>
                            </Row>
                          )}
                        </div>
                        :
                        <h1>Messages not Aviable</h1>
                      }
                    </Tab.Pane>
                    <Tab.Pane eventKey="unView">
                      {unViews.length > 0 ?
                        <div>
                          {unViews.map((item, i) =>
                            <Row id="message" className="my-md-4 my-1" key={i + 1}>
                              <Col className="col-md-8 col-12">
                                <Card>
                                </Card>
                                <div>
                                  <Card>
                                    <CardHeader className="bg-danger">
                                      <h6 className="text-white">O'qilmagan</h6>
                                      <h6
                                        className="text-white">{item.createdAt.substring(0, 10) + ` da yuborilgan`}</h6>
                                    </CardHeader>
                                    <CardBody>
                                      <h6><i> {item.messageText}</i></h6>
                                    </CardBody>
                                    <CardFooter>`
                                      <Button color="success" onClick={() => isViewChange(item.id)}>
                                        O'qidim
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                </div>
                              </Col>
                            </Row>
                          )}
                        </div>

                        :

                        <h1>Messages not Aviable</h1>
                      }
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </DashboardLayout>
      </div>
    )
      ;
  }
}

Index.propTypes = {};

export default Index;
