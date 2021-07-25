import request from '../utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/user/get',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function fetchList(data) {
  return request({
    url: '/users/list',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function userVerify(data) {
  return request({
    url: '/confirmation/tokens/adminverifyEmail',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function userDelete(data) {
  return request({
    url: '/users/delete',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function userDetail(data) {
  return request({
    url: '/users/get',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function userEdit(data) {
  return request({
    url: '/users/update',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function userCompany(data) {
  return request({
    url: '/users/company',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function userResources(data) {
  return request({
    url: '/resources/listGroupYear',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function userResourcesDetail(data) {
  return request({
    url: '/resources/listByUserIdAndYear',
    method: 'post',
    data: qs.stringify(data)
  })
}
