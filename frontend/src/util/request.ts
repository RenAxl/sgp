import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { toast } from "react-toastify";
import history from "./history";
import { getAuthData } from "./storage";

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? "sgp";
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? "sgp123";

type LoginData = {
  username: string;
  password: string;
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: "Bearer " + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: "password",
  });

  return axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/oauth/token",
    data,
    headers,
  });
};


axios.interceptors.response.use(
  function (response) {
    //
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      history.push('/admin/auth');
    
      toast.error('Erro de resposta do servidor!  Você não possui autorização para esta requisição.')
    }
    if (error.response.status === 403) {
      history.push('/admin/auth');
    
      toast.error('Erro de resposta do servidor!  Você não possui autorização para esta requisição.')
    }
    return Promise.reject(error);
  }
);
  
