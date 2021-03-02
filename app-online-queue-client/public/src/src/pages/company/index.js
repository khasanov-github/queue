import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {Button, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "dva";
import OurPaginations from "../../components/OurPaginations";


@connect(({companyModel})=>({companyModel}))
class Company extends Component {
  componentDidMount() {
   const {dispatch}=this.props;
   dispatch({
     type:'companyModel/getCompanies'
   })
  }

  handleChange = event => {
    this.props.dispatch({
     type:'companyModel/updateState',
     payload:{
       filter:event.target.value
     }
    })
  }
  ;

  render() {

    const {dispatch,companyModel}=this.props;
    let {companies,showModal,active,currentCom,size,filter,page,totalElements,totalPages} =companyModel;

    companies  = companies.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()));



    const changePage = (page) => {
      dispatch({
        type: 'companyModel/getCompanies',
        payload: {
          page: page - 1,
          size: 4
        }
      });
    };
    const changeAvtive=()=>{
      dispatch({
        type:'companyModel/updateState',
        payload:{
          active:!active
        }
      })
    };
    const changeAvtiveSave=()=>{
      dispatch({
        type:'companyModel/changeActive',
        payload:{id:currentCom.id, active:active}
      })
    };
    const openModal=(item)=>{
      dispatch({
        type:'companyModel/updateState',
        payload: {
          showModal:!showModal,
          currentCom:item,
          active:item.active
        }
      });
    };
    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container pt-5 com-container">
            <p className="ssss">sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
            <div className="row com-row1">
              <div className="col-12"><h2>Kompanyalar</h2></div>
              <div className="col">
                <button className="btn btn-success px-4">Kompanyalar</button>
              </div>
              <div className="col-5   com-col1"> <input type="text" value={filter} onChange={this.handleChange} className="com-input1" placeholder="Kompanya nomini kiriting"/></div>
            </div>
            <div className="row pt-2">
              <div className="col-12">
                <Table>
                  <thead>
                  <tr>
                    <th>T/r</th>
                    <th>Kompanya nomi</th>
                    <th>Holati</th>
                    <th>A'zo bo'lgan vaqti</th>
                    <th>amallar</th>
                  </tr>
                  </thead>
                  <tbody>
                  {companies.map((item,i)=>
                    <tr key={item.id}>
                      <td>{i+1}</td>
                      <td>{item.name}</td>
                      <td>{item.active ? "fa'ol" : "fa'ol emas"}</td>
                      <td>{item.createdAt.slice(0,10)}</td>
                      <td><button className="text-white rounded bnt btn-warning" onClick={()=>openModal(item)}>edit</button></td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
              <div className="row">
                <div className="col-2">
                  <OurPaginations
                    activePage={0}
                    totalElements={totalElements}
                    size={size}
                    showPageCount={totalPages < 5 ? totalPages : 5}
                    changePage={changePage}
                  />
                </div>
              </div>
            </div>
          </div>
        </DashboardLayout>
        <Modal isOpen={showModal}>
          <ModalHeader>
            <h5>{"siz shu "+currentCom.name+" kompanyani xolatini uzgartirmoqdasiz"}</h5>
          </ModalHeader>
          <ModalBody>
            <h5>{'hozirgi holati '+currentCom.active}{currentCom.active?' yani fa\'ol':' yani fa\'ol emaas'}</h5>
           <div className="d-flex">
             <span className="mr-1">false</span>
             <CustomInput type="switch"  id="aa" checked={active} onChange={changeAvtive} label="true" />
           </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={openModal} color="warning">cancel</Button>
            <Button color="success" onClick={changeAvtiveSave}>submit</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Company.propTypes = {};

export default Company;
