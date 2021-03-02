import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "dva";
import DashboardLayout from "../../../components/DashboardLayout";
import {Tab, Tabs} from "react-bootstrap";
import {Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {MDBDataTable} from "mdbreact";
import {FaEdit, FaRegTrashAlt} from "react-icons/fa";

@connect(({globalModel}) => ({globalModel}))
class Map extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'globalModel/updateState',
      payload: {
        showModal: false,
        showDeleteModal: false
      }
    });
    // dispatch({
    //   type: 'globalModel/getItems',
    //   payload: {
    //     type: 'region'
    //   }
    // });
    // dispatch({
    //   type: 'globalModel/getItems',
    //   payload: {
    //     type: 'district'
    //   }
    // })
  }

  render() {
    const {dispatch, globalModel} = this.props;
    const {showModal, regions, showDeleteModal, currentItem, districts} = globalModel;
    //MODALNI OCHISH FUNKSIYASI
    const openModal = (item) => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          showModal: !showModal,
          currentItem: item
        }
      })
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
          ...currentItem,
          type: isDistrict ? 'district' : 'region'
        }
      })
    };
    const save = (e, v) => {
      dispatch({
        type: 'globalModel/save',
        payload: {
          id: currentItem.id ? currentItem.id : null,
          ...v,
          type: isDistrict ? 'district' : 'region'
        }
      })
    };
    let isDistrict = (currentItem.regionId || currentItem === "district");
    let regionList = [];
    let trNumber = 1;
    for (const item in regions) {
      let t = {
        tr: "#" + trNumber++,
        ...regions[item],
        action: <div><Button className="mr-1 p-2" color='warning' onClick={() => openModal(t)}><FaEdit
          className="text-dark"/></Button>
          <Button className="p-2" color='danger' onClick={() => openDeleteModal(t)}><FaRegTrashAlt/></Button></div>
      };
      regionList.push(t);
    }
    let districtList = [];
    trNumber = 1;
    for (let item in districts) {
      let t = {
        tr: "#" + trNumber++,
        ...districts[item],
        regionName: districts[item].region['nameUzl'],
        action: <div><Button className="mr-1 p-2" color='warning' onClick={() => openModal(t)}><FaEdit
          className="text-dark"/></Button>
          <Button className="p-2" color='danger' onClick={() => openDeleteModal(t)}><FaRegTrashAlt/></Button></div>
      };
      districtList.push(t);
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
          label: 'NameUzl',
          field: 'nameUzl',
          sort: 'asc',
          width: 150
        },
        {
          label: 'NameUzk',
          field: 'nameUzk',
          sort: 'asc',
          width: 270
        },
        {
          label: 'NameRu',
          field: 'nameRu',
          sort: 'asc',
          width: 200
        },
        {
          label: 'nameEn',
          field: 'nameEn',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 150
        }
      ],
      rows: regionList
    };
    const data2 = {
      columns: [
        {
          label: 'T/r',
          field: 'tr',
          sort: 'asc',
          width: 100
        },
        {
          label: 'NameUzl',
          field: 'nameUzl',
          sort: 'asc',
          width: 200
        },
        {
          label: 'NameUzk',
          field: 'nameUzk',
          sort: 'asc',
          width: 200
        },
        {
          label: 'NameRu',
          field: 'nameRu',
          sort: 'asc',
          width: 200
        },
        {
          label: 'nameEn',
          field: 'nameEn',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Region NameUzl',
          field: 'regionName',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 200
        }
      ],
      rows: districtList
    };
    return (
      <DashboardLayout pathname={this.props.pathname}>
        <div className="container">
          <div className="row mt-sm-3 mr-0">
            <div className="col-md-12 mr-0">
              <Breadcrumb>
                <BreadcrumbItem><a href="/admin">Bosh sahifa</a></BreadcrumbItem>
                <BreadcrumbItem active>Hududlar</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="col-md-6">
              <h1 className="font-weight-light">Hududlar</h1>
            </div>
            <div className="col-12 py-md-3">
              <Tabs defaultActiveKey="region" className="" id="uncontrolled-tab-example">
                <Tab eventKey="region" title="Regionlar" tabClassName="bg-white">
                  <div className="regionTabs  bg-light p-md-3">
                    <Button className="btn btn-success my-2" onClick={() => openModal('region')}>Add Region</Button>
                    <MDBDataTable
                      theadColor="dark"
                      paginationLabel={["Oldingisi", "Keyingisi"]}
                      pagesAmount={8}
                      paging={true}
                      info={true}
                      small={true}
                      infoLabel={["Namoyish etilayabdi", " dan", " gacha", "tadan"]}
                      maxHeight="1000px"
                      order={['tr', 'desc']}
                      bordered
                      entriesOptions={[5, 10, 15, 20]}
                      entriesLabel="Ro'yhat sanog'i:"
                      entries={10}
                      searchLabel="Qidirish"
                      searching={true}
                      hover
                      data={data}
                    />
                  </div>
                </Tab>
                <Tab eventKey="district" title="Districtlar" tabClassName="bg-white">
                  <div className="districtTabs  bg-light p-md-3">
                    <Button className="btn btn-success my-2" onClick={() => openModal('district')}>Add District</Button>
                    <MDBDataTable
                      theadColor="dark"
                      paginationLabel={["Oldingisi", "Keyingisi"]}
                      pagesAmount={8}
                      paging={true}
                      info={true}
                      small={true}
                      infoLabel={["Namoyish etilayabdi", " dan", " gacha", "tadan"]}
                      maxHeight="1000px"
                      order={['tr', 'desc']}
                      bordered
                      entriesOptions={[5, 10, 15, 20]}
                      entriesLabel="Ro'yhat sanog'i:"
                      entries={10}
                      searchLabel="Qidirish"
                      searching={true}
                      hover
                      data={data2}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>

          <Modal isOpen={showModal}>
            <AvForm
              onValidSubmit={save}>
              <ModalHeader>
                {isDistrict ? currentItem.nameUzk ? 'Edit district' : 'Add district' : currentItem.nameUzk ? 'Edit region' : 'Add region'}
              </ModalHeader>
              <ModalBody>
                <AvField defaultValue={currentItem.nameUzl} name="nameUzl" label="O'zbek lotincha nomi" required
                         placeholder="O'zbekcha lotincha nomini kiriting..."/>
                <AvField defaultValue={currentItem.nameUzk} name="nameUzk" label="O'zbek krillcha nomi" required
                         placeholder="O'zbekcha krillcha nomini kiriting..."/>
                <AvField defaultValue={currentItem.nameRu} name="nameRu" label="Ruscha nomi" required
                         placeholder="Enter name russia "/>
                <AvField defaultValue={currentItem.nameEn} name="nameEn" label="Inglizcha nomi" required
                         placeholder="Enter english name"/>
                {isDistrict ?
                  <AvField name="region" type="select" selected
                           value={currentItem ? "/" + currentItem.regionId : "0"}
                           required>
                    <option value="0">Regionnni tanlang</option>
                    {regions.map(item =>
                      <option key={item.id} value={"/" + item.id}>{item.nameUzl}</option>
                    )}
                  </AvField> : ''}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" type="button" onClick={openModal}>Cancel</Button>
                <Button color="success">Save</Button>
              </ModalFooter>
            </AvForm>
          </Modal>

          {/*DELETE ITEM CONTENT*/}
          <Modal isOpen={showDeleteModal}>
            <ModalHeader>
              {"Rostdan ham  o'chirishni istaysizmi " + currentItem.nameUzk + 'ni ?'}
            </ModalHeader>
            <ModalFooter>
              <Button color="primary" onClick={openDeleteModal}>No</Button>
              <Button color="danger" onClick={deleteItem}>Yes</Button>
            </ModalFooter>
          </Modal>
        </div>
      </DashboardLayout>
    );
  }
}

Map.propTypes = {};

export default Map;
