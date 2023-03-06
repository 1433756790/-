import axios from "axios";
import { Toast, showFailToast } from "vant";
import router from "../router";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://backend-api-01.newbee.ltd/api/v1",
    timeout: 3000,
  });
  // instance.interceptors.request.use(
  //   (config) => {
  //     if (sessionStorage.getItem("newbeeToken")) {
  //       config.headers["Authorization"] = sessionStorage.getItem("newbeeToken");
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  instance.defaults.withCredentials = true;
  instance.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
  instance.defaults.headers["token"] = localStorage.getItem("token") || "";
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.interceptors.response.use((config) => {
    if (typeof config.data !== "object") {
      showFailToast("服务端异常");
      return Promise.reject(config);
    }
    if (config.data.resultCode != 200) {
      if (config.data.message) showFailToast(config.data.message);
      if (config.data.resultCode == 416) {
        router.push({ path: "/login" });
      }
    }
    return config;
  });
  return instance(config);
}
