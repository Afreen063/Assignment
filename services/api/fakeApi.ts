import axios from "axios";

const baseURL = "https://fakestoreapi.com";

const api = axios.create({
  baseURL: baseURL,
});

api.defaults.timeout = 5 * 60 * 1000;

api.defaults.withCredentials = false;

export async function getRequest(URL: string, param: any = {}) {
  return await api.get(`${baseURL}${URL}`, { params: param });
}
