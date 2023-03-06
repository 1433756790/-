import { request } from "@/utils/request.js";

export function getDetail(id) {
  return request({
    url: `/goods/detail/${id}`,
  });
}

export function Search(params) {
  return request({
    url: "/search",
    params: params,
  });
}

export function getCategory(){
  return request({
    url:'/categories'
  })
}
