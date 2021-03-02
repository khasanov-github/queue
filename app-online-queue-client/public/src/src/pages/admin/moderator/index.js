import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DashboardLayout from "../../../components/DashboardLayout";
import {Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {MDBDataTable} from "mdbreact";
import {connect} from "dva";
import {FaEdit, FaRegTrashAlt} from "react-icons/fa";
import {AvFeedback, AvField, AvForm} from "availity-reactstrap-validation";
import {toast} from "react-toastify";

@connect(({globalModel}) => ({globalModel}))
class Moderator extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'globalModel/getItems',
      payload: {
        type: 'moderator',
        role_id: "user/byRole/5"
      }
    });
  }

  render() {
    const {dispatch, globalModel} = this.props;
    const {currentUser, isAdmin, showModal, showDeleteModal, currentItem, isModer, moderators} = globalModel;

    const openModal = (item) => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          showModal: !showModal,
          currentItem: item
        }
      });
    };
    const openDeleteModal = (item) => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          showDeleteModal: !showDeleteModal,
          currentItem: item
        }
      })
    };
    const deleteItem = () => {
      dispatch({
        type: 'globalModel/deleteItem',
        payload: {
          type: 'moderator',
          role_id: "auth/deleteModerator/" + currentItem.id
        }
      })
    };
    const save = (e, v) => {
      // if (currentItem.id && (v.password || v.prePassword))
      if (v.password === v.prePassword) {
        dispatch({
          type: 'globalModel/save',
          payload: {
            id: currentItem.id ? currentItem.id : null,
            ...v,
            type: 'moderator',
            role_id: (currentItem.id ? "auth/editModerator/" + currentItem.id : "auth/addModerator")
          }
        })
      } else {
        toast.error("Parol va qayt parol noto'g'ri!");
      }
    };
    const checkPass = () => {
      let checkFeedBlock = document.getElementById("checkFeed");
      if (document.getElementById("password").value === document.getElementById("prePassword").value) {
        checkFeedBlock.style.color = 'green';
        checkFeedBlock.innerText = "Parol va qayta parol mos!";
      } else {
        checkFeedBlock.style.color = "red";
        checkFeedBlock.innerText = "Parol va qayta parol mos emas!";
      }
    };
    let moderatorList = [];
    let trNumber = 1;
    for (const item in moderators) {
      let t = {
        tr: "#" + trNumber++,
        ...moderators[item],
        addTime: new Date(moderators[item].createdAt).toUTCString(),
        editTime: new Date(moderators[item].updatedAt).toUTCString(),
        fish: moderators[item].firstName + " " + moderators[item].lastName + " " + moderators[item].middleName,
        action: <div><Button className="mr-1 p-2" color='warning' onClick={() => openModal(t)}><FaEdit
          className="text-dark"/></Button>
          <Button className="p-2" color='danger' onClick={() => openDeleteModal(t)}><FaRegTrashAlt/></Button></div>
      };
      moderatorList.push(t);
    }
    const data = {
      columns: [
        {
          label: 'T/r',
          field: 'tr',
          sort: 'asc',
          width: 150
        },
        {
          label: "FISH  ",
          field: 'fish',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Telefon raqami',
          field: 'phoneNumber',
          sort: 'asc',
          width: 100
        },
        {
          label: "Qo'shilgan vaqti",
          field: 'addTime',
          sort: 'asc',
          width: 200
        },
        {
          label: "Tahrirlangan vaqti",
          field: 'editTime',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Amaliyot',
          field: 'action',
          sort: 'asc',
          width: 100
        }
      ],
      rows: moderatorList
    };
    return (
      <DashboardLayout pathname={this.props.pathname}>
        <div className="container">
          <div className="row mt-sm-3 mr-0">
            <div className="col-md-12 mr-0">
              <Breadcrumb>
                <BreadcrumbItem><a href="/admin">Bosh sahifa</a></BreadcrumbItem>
                <BreadcrumbItem active>Moderatorlar</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="col-md-6">
              <h1 className="font-weight-light">Moderatorlar</h1>
            </div>
            <div className="col-md-12">
              <Button className="btn btn-success my-2" onClick={() => openModal('')}>Moderator qo'shish</Button>
              <MDBDataTable
                theadColor="dark"
                paginationLabel={["Oldingisi", "Keyingisi"]}
                pagesAmount={5}
                paging={true}
                info={true}
                infoLabel={["Namoyish etilayabdi", " dan", " gacha", "tadan"]}
                order={['tr', 'desc']}
                className=""
                bordered
                entriesOptions={[5, 10, 25, 50, 100]}
                entriesLabel="Ro'yhat sanog'i:"
                entries={10}
                searchLabel="Qidirish"
                searching={true}
                hover
                small={true}
                data={data}
              />
            </div>
          </div>
        </div>
        <Modal isOpen={showModal}>
          <AvForm
            onValidSubmit={save}>
            <ModalHeader>
              {currentItem.username ? 'Moderatorni tahrirlash' : "Yangi moderator qo'shish"}
            </ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-md-6">
                  <AvField defaultValue={currentItem.firstName} name="firstName" label="Ismini kiriting:" required
                           placeholder="e.g, Anvar"/>
                  <AvField defaultValue={currentItem.middleName} name="middleName" label="Otasinig ismini kiriting:"
                           placeholder="e.g, Anvar o'g'li"/>
                  <AvField type="password" id="password" name="password"
                           label="Parolni kiriting:"
                           required
                           placeholder="e.g, qwerty123"/>
                </div>
                <div className="col-md-6">
                  <AvField defaultValue={currentItem.lastName} name="lastName" label="Familiyasini kiriting:" required
                           placeholder="e.g, Anvarov"/>
                  <AvField defaultValue={currentItem.phoneNumber} name="phoneNumber" label="Telefon raqamini kiriting:"
                           required
                           placeholder="e.g, +998911234567"/>
                  <AvField onChange={checkPass} id="prePassword" type="password"
                           name="prePassword"
                           label="Parolni qayta kiriting:"
                           required
                           placeholder="e.g, qwerty123"/>
                  <p id="checkFeed" style={{"font-size": "12px"}} className="font-weight-bolder"></p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={openModal}>Bekor qilish</Button>
              <Button color="success">Saqlash</Button>
            </ModalFooter>
          </AvForm>
        </Modal>

        <Modal isOpen={showDeleteModal}>
          <ModalHeader>
            {"Rostdan ham  o'chirishni istaysizmi " + currentItem.fish + 'ni ?'}
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={openDeleteModal}>No</Button>
            <Button color="danger" onClick={deleteItem}>Yes</Button>
          </ModalFooter>
        </Modal>
      </DashboardLayout>

    );
  }
}

Moderator.propTypes = {};

export default Moderator;
