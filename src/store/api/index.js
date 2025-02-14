import axios from "axios";
import { useAuth } from "../../context/AuthContext";

// const API_BASE_URL = process.env.REACT_APP_IS_PRODUCTION === 'development' ? process.env.REACT_APP_API_BASE_URL :  process.env.REACT_APP_API_BASE_PRODUCTION_URL;

export const axiosInstance = axios.create({
  baseURL: serverUrl,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Credentials': true
  },
});

const getAccessToken = () => {
  const rawUser = localStorage.getItem('user');

  try{
    return JSON.parse(rawUser)?.access_token
  }catch(_){}
}

export const api = {
  get: async ({ url, params }) => {


    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Credentials': true
      },
    };
    let token = getAccessToken()
    if (token){
      config.headers['Authorization'] = `Bearer ${token}`
    }

    const mUrl = url.startsWith("http") ? url : process.env.DEVICE_BACKEND_URL + '/' + url

    return await axiosInstance.get(mUrl, config).catch((res)=>{
      if (res?.response?.status === 401){
        window.location.replace('/signin')
      }
    });
  },
  post: async ({ url, formData, body }) => {
 
    const config = {
      headers: {
        "Content-Type": formData ? "multipart/form-data" : "application/json",
        accept: "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Credentials': true
      },
    };
    let token = getAccessToken()
    if (token){
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return await axiosInstance.post(url, formData||body, config).catch((res)=>{
      if (res?.response?.status === 401){
        window.location.replace('/signin')
      }
    });
  },
  put: async ({ url, body }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': true
      },
    };
    let token = getAccessToken()
    if (token){
      config.headers['Authorization'] = `Bearer ${token}`
    }
    const mUrl = url.startsWith("http") ? url : process.env.DEVICE_BACKEND_URL + '/' + url
    return await axiosInstance.put(mUrl, body, config).catch((res)=>{
      if (res?.response?.status === 401){
        window.location.replace('/signin')
      }
    });
  },

  delete: async ({ url }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': true
      },
    };
    let token = getAccessToken()
    if (token){
      config.headers['Authorization'] = `Bearer ${token}`
    }
    const mUrl = url.startsWith("http") ? url : process.env.DEVICE_BACKEND_URL + '/' + url
    return await axiosInstance.delete(mUrl, config).catch((res)=>{
      if (res?.response?.status === 401){
        window.location.replace('/signin')
      }
    });
  },
};
