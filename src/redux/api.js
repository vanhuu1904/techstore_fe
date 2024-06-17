import axios from "../axios/axios.customize.js";

export const createOrder = (body) => {
  return axios.post("order/new", body);
};
