import { request } from "@/utils/request.js";

export function getAddressDetail(id) {
  return request({
    url: `/address/${id}`,
  });
}

export function getAddressList() {
  return request({
    url: "/address",
    data: { pageNumber: 1, pageSize: 1000 },
  });
}

export function getDefaultAddress() {
  return request({
    url: "/address/default",
  });
}

export function DeleteAddress(id) {
  return request({
    method: "delete",
    url: `/address/${id}`,
  });
}

export function EditAddress(params) {
  return request({
    method: "put",
    url: "/address",
    data: params,
  });
}

export function addAddress(params) {
  return request({
    method: "post",
    url: "/address",
    data: params,
  });
}
