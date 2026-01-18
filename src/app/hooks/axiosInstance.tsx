import axios from "axios";
import Cookies from 'js-cookie';

const authToken = Cookies.get('authToken');

export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const AxiosInstanceMultipart = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 500000,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export const createAxiosWithToken = (token: string) =>
   axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });