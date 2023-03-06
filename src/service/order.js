import { request } from "@/utils/request.js";

export function payOrder(params) {
  return request({
    url: "paySuccess",
    params: params,
  });
}

export function createOrder(params) {
  return request({
    url: "/saveOrder",
    method: "post",
    data: params,
  });
}

export function getOrderList(params) {
  return request({
    url: "/order",
    params: params,
  });
}

export function getOrderDetail(id) {
  return request({
    url: `/order/${id}`,
  });
}

export function cancelOrder(id) {
  return request({
    method: "put",
    url: `/order/${id}/cancel`,
  });
}

export function confirmOrder(id) {
  return request({
    method: "put",
    url: `/order/${id}/finish`,
  });
}
