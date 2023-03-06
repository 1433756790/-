import { request } from "@/utils/request.js";

export function Register(params) {
  return request({
    url: "/user/register",
    method: "post",
    params: params,
  });
}

export function Login(params) {
  return request({
    url: "/user/login",
    method: "post",
    data: params,
  });
}

export function getUserInfo() {
  return request({
    url: "/user/info",
  });
}

export function EditUserInfo(params) {
  return request({
    method: "put",
    url: "/user/info",
    data: params,
  });
}

export function logout() {
  return request({
    method: "post",
    url: "/user/logout",
  });
}
