import axios from "axios";
import {API_PREFIX} from "@/constants/constants";
import request from "./utils";
import {COMPANY} from "../constants/constants";

export function saveCategory(data) {
  return request({
    url: 'category',
    method: data.id ? 'PUT' : 'POST',
    data
  })
}

export function getCategories() {
  return request({
    url: 'category'
  })
}

export function getRegions(data) {
  return request({
    url: 'region'
  })
}

export function save(data) {
  if (data.id != null) {
    return request({
      url: (data.role_id ? data.role_id : data.type),
      method: 'PATCH',
      data
    })
  }
  return request({
    url: (data.role_id ? data.role_id : data.type),
    method: 'POST',
    data
  })
}

export function getDistricts() {
  return request({
    url: 'district'
  })
}

export function getItems(data) {
  return request({
    url: (data.role_id ? data.role_id : data.type)
  })
}

export function deleteItem(data) {
  return request({
    url: (data.role_id ? data.role_id : (data.type + '/' + data.id)),
    method: 'Delete'
  })
}

export function saveAware(data) {
  return request({
    url: 'aware',
    method: data.id ? 'PUT' : 'POST',
    data
  })
}

export function getAwares() {
  return request({
    url: 'aware'
  })
}

export function deleteAware(data) {
  return request({
    url: 'aware' + '/' + data.id,
    method: 'Delete'
  })
}

export function userMe() {
  return request({
    url: 'user/userMe',
  })
}

export function login(data) {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}

export function isHave(data) {
  console.log(data);
  return request({
    url: 'auth/isHave',
    method: 'post',
    data: data
  })
}

export function register(data) {
  console.log(data);
  return request({
    url: 'company',
    method: 'post',
    data: data
  })
}

export function getCompanies(data) {
  return request({
    url: `company?page=${data.page}&size=${data.size}`
  });
}

export function getDistrictsByRegion(data) {
  return request({
    url: "district/search/byRegion?id=" + data.region_id
  });
}

export function uploadFile(data) {
  let obj = new FormData();
  obj.append("file", data.file);
  return request({
    url: 'attachment/upload',
    method: 'post',
    data: obj
  });
}

//////////////Operator Kiosk///////////////////
export function getQueue() {
  return request({
    url: 'queue'
  });
}

export function getQueues(data) {
  return request({
    url: `queue/list/${data.id}?status=${data.status}&size=10`
  });
}
export function setStatus(data) {
  return request({
    url: `queue/setStatus`,
    method: 'post',
    data
  });
}

//////////////Director Full Interface Action///////////////////
export function saveDirection(data) {
  return request({
    url: 'direction',
    method: data.id ? 'PUT' : 'POST',
    data
  })
}

export function deleteDirection(data) {
  return request({
    url: 'direction' + '/' + data.id,
    method: 'Delete'
  })
}

export function getDirections(data) {
  return request({
    url: 'direction/byCompany/'+data
  })
}

export function getReceptions(data) {
  return request({
    url: "directorInterface/getListReception"
  })
}

export function saveStaff(data) {
  return request({
    url: !data.id?data.direction?'directorInterface/'+data.direction.id:'directorInterface':'directorInterface',
    method:data.id?'PUT':'POST',
    data
  })
}

export function deleteStaff(data) {
  return request({
    url: "directorInterface/"+data.id,
    method: 'DELETE'
  })
}

export function onOffStaff(data) {
  return request({
    url: 'directorInterface/onOff/'+data.id,
    method:'PUT',
    data: data.active
  })
}


export function getQueueInfo(data) {
  return request({
    url: 'queue/'+data.company_id,
    method: 'GET'
  })
}

// Message & Report
export function getMessages() {
  return request({
    url: `message`,
    method: 'get',
  });
}

export function viewChange(data) {
  return request({
    url: 'message/' + data,
    method: 'put',
  });
}

export function addComplain(data) {
  return request({
    url: 'message/createComplain',
    method: 'post',
    data: data.v
  });
}

export function gotComplains() {
  return request({
    url: 'message/complain',
    method: 'get'
  });
}

export function deleteComplain(data) {
  return request({
    url: 'message/complain',
    method: 'put',
    data: data.data
  });
}

export function sendReport(data) {
  console.log(data);
  return request({
    url: 'message/report',
    method: 'post',
    data
  });
}




















