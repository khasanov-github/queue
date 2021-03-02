import React, {Component} from 'react';
import {Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {connect} from "dva";
import DashboardLayout from "../../../components/DashboardLayout";
import {MDBBtn} from "mdbreact";

@connect(({globalModel, queueModel}) => ({globalModel, queueModel}))
class Kiosk extends Component {

  componentDidMount() {
    const {dispatch, globalModel} = this.props;
    const {directionId} = globalModel;

    dispatch({
      type: 'queueModel/getQueues',
      payload: {
        id: directionId,
        status: 'WAITING'
      }
    });

  }

  render() {
    const {globalModel, queueModel, dispatch} = this.props;
    const {directionId, countAllQueue, durationTime, lastQueueNumber} = globalModel;
    const {waiting, delaying, userPhoneNumber, isAccepted, queueNumber, status, queueId, delay, showModal} = queueModel;

    const toAccepted = (item) => {
      dispatch({
        type: 'queueModel/setStatus',
        payload: {
          queueId: item.id,
          status: 'ACCEPTED'
        }
      });

      dispatch({
        type: 'queueModel/updateState',
        payload: {
          isAccepted: true,
          queueId: item.id,
          userPhoneNumber: item.userPhoneNumber,
          queueNumber: item.queueNumber,
          status: item.status,
        }
      });
    };


    const toClosed = () => {
      dispatch({
        type: 'queueModel/setStatus',
        payload: {
          queueId: queueId,
          status: 'CLOSED'
        }
      });

      dispatch({
        type: 'queueModel/getQueues',
        payload: {
          id: directionId,
          status: 'DELAY'
        }
      });

      dispatch({
        type: 'queueModel/getQueues',
        payload: {
          id: directionId,
          status: 'WAITING'
        }
      });

      dispatch({
        type: 'queueModel/updateState',
        payload: {
          isAccepted: false,
          queueId: '',
          userPhoneNumber: '',
          queueNumber: '',
          status: '',
        }
      });

      if (delaying.length === 0) {
        dispatch({
          type: 'queueModel/updateState',
          payload: {
            delay: false,
          }
        });
      }

      dispatch({
        type: 'globalModel/getQueue'
      })
    };


    const toDelay = () => {
      dispatch({
        type: 'queueModel/updateState',
        payload: {
          delay: true,
          showModal: false
        }
      });

      dispatch({
        type: 'queueModel/setStatus',
        payload: {
          queueId: queueId,
          status: 'DELAY'
        }
      });

      dispatch({
        type: 'queueModel/getQueues',
        payload: {
          id: directionId,
          status: 'DELAY'
        }
      });
      dispatch({
        type: 'queueModel/getQueues',
        payload: {
          id: directionId,
          status: 'WAITING'
        }
      })
    };


    const show = (item) => {
      dispatch({
        type: 'queueModel/updateState',
        payload: {
          showModal: !showModal,
          queueId: item.id,
        }
      });
    };

    return (
      <div>
        <div>

          <DashboardLayout/>

          <div className="kiosk-card-l">
            <Row>
              {delay ?
                <Col className="col-md-4 isDelay-r">
                  {delaying.map((item, i) =>
                    <div className="w-100 bg-danger border-bottom">
                      <Row>
                        <Col className="col-md-1 text-white">
                          <p className="h4 mt-3 ml-2">#{i + 1}</p>
                        </Col>
                        <Col className="col-md-6">
                          <div className="ml-3 text-white">
                            <h6 className="mt-2">Tel: {item.userPhoneNumber}</h6>
                            <p className="mt-n2">Navbat raqami: <b>{item.queueNumber}</b></p>
                            <p>Qabul vaqti: </p>
                            <p className="mt-n3">{item.startTime}</p>

                          </div>
                        </Col>
                        <Col className="col-md-5">
                          <div className="text-white">
                            <h6 className="mt-2">Holati : {item.status}</h6>
                            <p className="">Kechikish vaqti: </p>
                            <p className="mt-n3">{item.startTime}</p>
                            <div className="mb-2">
                              <MDBBtn className="mt-n3" color="primary" size="sm" onClick={() => toAccepted(item)}
                                      disabled={isAccepted ? true : false}>Qabul qilish</MDBBtn>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Col>
                : ''}


              <Col className={delay ? `col-md-4 isDelay-l isDelay-r ` : `col-md-5`}>

                <div className="border-left  bg-dark">
                  <div className="ml-4 w-100 text-white">
                    <h3 className="pt-3">Navbat: ---</h3>
                    <p className="">Kutayotganlar: {countAllQueue}</p>
                    <p className="mt-n3">Qabulning o’rtacha davomiyligi: {durationTime}</p>
                    {console.log(durationTime)}
                    <p className="mt-n3">Hozirgi navbat: {queueNumber}</p>
                    <p className="mt-n3">Oxirgi navbat: {lastQueueNumber}</p>
                  </div>
                  <div className="border-top">
                    <div className=" mt-2 ml-4 w-100 text-white">
                      <Row>
                        <Col className="offset-3 mt-3">
                          <h3 className="ml-2">Qabul</h3>
                        </Col>
                      </Row>
                      <h6 className="mt-3">Qabul qilinuvchini: {userPhoneNumber}</h6>
                      <h6 className="mt-3">Navbat raqami: {queueNumber}</h6>
                      <h6 className="mt-3">Holati : {status}</h6>
                      <Row>
                        <Col className="offset-3 mb-3 mt-5">
                          <MDBBtn color="primary" disabled={isAccepted ? false : true}
                                  onClick={toClosed}>Tugatish</MDBBtn>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>


              <Col className={delay ? `col-md-4 isDelay-l border-left` : `offset-1 col-md-6`}>
                <div className="bg-dark">
                  {
                    waiting.map((item, i) =>
                      <div className="w-100 border-bottom">
                        <Row>
                          <Col className="col-md-1 text-white">
                            <p className={delay ? `h5 mt-3 ml-2` : `h4 mt-3 ml-3`}>#{i + 1}</p>
                          </Col>
                          <Col className="col-md-6">
                            <div className="ml-3 text-white">
                              <h6 className="mt-2">Tel: {item.userPhoneNumber}</h6>
                              <p className="mt-n2">Navbat raqami: {item.queueNumber}</p>
                              {(i + 1) == 1 ?
                                <div className="mb-2 kiosk-div">
                                  <MDBBtn className={delay?`mt-n2`:`mt-2`} color="success" size="sm"
                                          disabled={isAccepted ? true : false} onClick={() => toAccepted(item)}>Qabul
                                    qilish</MDBBtn>
                                  <MDBBtn className={delay ? `mt-2` : `ml-4 mt-2`} color="warning" size="sm"
                                          disabled={isAccepted ? true : false}
                                          onClick={() => show(item)}>Kechiktirish</MDBBtn>
                                </div>
                                : ''}
                            </div>
                          </Col>
                          <Col className="col-md-5">
                            <div className="text-white">
                              <h6 className="mt-2">Holati : {item.status}</h6>
                              <p>Qabul vaqti: </p>
                              <p className="mt-n3">{item.startTime}</p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )
                  }
                </div>
              </Col>
            </Row>
          </div>
        </div>


        <Modal isOpen={showModal}>
          <ModalHeader>
            <h4>Navbatni kechiktirish</h4>
          </ModalHeader>
          <ModalBody>
            {/*<h6 className="mt-2">Tel: </h6>*/}
            {/*<p className="mt-n2">Navbat raqami:</p>*/}
          </ModalBody>
          <ModalFooter>
            <MDBBtn className="mt-2" color="success" size="sm" onClick={toDelay}>Kechiktirish</MDBBtn>
            <MDBBtn className="ml-4 mt-2" color="warning" size="sm" onClick={show}>Bekor qilish</MDBBtn>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Kiosk.propTypes = {};

export default Kiosk;
///281
