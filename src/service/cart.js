import { request } from "@/utils/request.js";

export function getCart(params) {
  return request({
    url: "/shop-cart",
    params: params,
  });
}

export function addCart(params) {
  return request({
    method: "post",
    url: "/shop-cart",
    data: params,
  });
}

export function modifyCart(params) {
  return request({
    url: "/shop-cart",
    method: "put",
    data: params,
  });
}

export function deleteCartItem(id) {
  return request({
    method: "delete",
    url: `/shop-cart/${id}`,
  });
}

export function getByCartItemIds(params) {
  return request({
    url: "/shop-cart/settle",
    params: params,
  });
}
