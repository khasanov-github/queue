import React, {Component} from 'react';
import {Container, Row, Button, Table, Col, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {connect} from "dva";
import {AvField, AvForm} from "availity-reactstrap-validation";
import DashboardLayout from "../../../components/DashboardLayout";

@connect(({globalModel}) => ({globalModel}))
class Index extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'globalModel/getQueuesInfo',
      payload: ''
    });
    this.props.dispatch({
      type: 'globalModel/getDirections',
      payload: ''
    });
  }

  render() {
    const {globalModel} = this.props;
    const {showModal, showDeleteModal, currentItem, directions, queuesInfo} = globalModel;
    const openModal = (item) => {
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          showModal: !showModal,
          currentItem: item
        }
      })
    };

    const openDeleteModal = (item) => {
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          showDeleteModal: !showDeleteModal,
          currentItem: item
        }
      })
    };
    const deleteDirection = () => {
      this.props.dispatch({
        type: 'globalModel/deleteDirection',
        payload: {
          id: currentItem.id,
        }
      })
    };

    const saveDirection = (e, v) => {
      this.props.dispatch({
        type: 'globalModel/addDirection',
        payload: {
          id: currentItem.id,
          ...v,
        }
      })
    };
    console.log(directions);
    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <Container>
            <Row>
              <Col>
                <h4 className="text-center">Direction list</h4>
              </Col>
            </Row>
            <Row>
              <Button className="m-3" color="primary" onClick={() => openModal('')}>
                Add Direction
              </Button>
            </Row>
            <Table className="table">
              <thead>
              <tr>
                <th>T/r</th>
                <th>Name O`z</th>
                <th>Name Uz</th>
                <th>Name Ru</th>
                <th>Name En</th>
                <th>Count of operators</th>
                <th>Count of queue</th>
                <th>Status</th>
                <th colSpan="2" className="text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              {directions.map((item, i) =>
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.nameUzl}</td>
                  <td>{item.nameUzk}</td>
                  <td>{item.nameRu}</td>
                  <td>{item.nameEn}</td>
                  <td className="text-center">{item.operatorDirections.length}</td>
                  <td className="text-center">{queuesInfo.map(info =>
                    info.directionId===item.id?info.totalQueues:''
                  )}</td>
                  <td className="text-center">{item.active?"ON":"OFF"}</td>
                  <td><Button className="btn-edit" onClick={() => openModal(item)}>Edit</Button></td>
                  <td><Button color="danger" onClick={() => openDeleteModal(item)}>Delete</Button></td>
                </tr>
              )}
              </tbody>
            </Table>
          </Container>
        </DashboardLayout>
        }


        <Modal isOpen={showModal}>
          <AvForm onValidSubmit={saveDirection}>
            <ModalHeader>
              {currentItem.nameUzk ? 'Edit direction' : 'Add direction'}
            </ModalHeader>
            <ModalBody>
              <AvField defaultValue={currentItem.nameUzl} name="nameUzl"
                       label="Direction name" required placeholder="Enter direction name O`z"/>
              <AvField defaultValue={currentItem.nameUzk} name="nameUzk"
                       label="Direction name" required placeholder="Enter direction name Uz"/>
              <AvField defaultValue={currentItem.nameRu} name="nameRu"
                       label="Direction name" required placeholder="Enter direction name Ru"/>
              <AvField defaultValue={currentItem.nameEn} name="nameEn"
                       label="Direction name" required placeholder="Enter direction name En"/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={openModal}>Cancel</Button>
              <Button type="submit" color="success">Save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>

        <Modal isOpen={showDeleteModal}>
          <ModalHeader>
            {'Are you sure delete ' + currentItem.nameUzl + '?'}
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={openDeleteModal}>No</Button>
            <Button color="danger" onClick={deleteDirection}>Yes</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
