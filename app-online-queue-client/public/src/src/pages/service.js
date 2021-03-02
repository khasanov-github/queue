import axios from "axios";
import {API_PREFIX} from "@/constants/constants";
import request from "./utils";

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






















