// src/api/client.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL } from '@env'; 


const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {

    return response;
  },
  (error: AxiosError) => {
    
    let errorMessage = 'Something went wrong';
    
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Bad request';
          break;
        case 401:
          errorMessage = 'Unauthorized';
          break;
        case 403:
          errorMessage = 'Forbidden';
          break;
        case 404:
          errorMessage = 'Not found';
          break;
        case 500:
          errorMessage = 'Server error';
          break;
        default:
          errorMessage = `Server error: ${error.response.status}`;
      }
    } else if (error.request) {
      errorMessage = 'Network error. Please check your connection.';
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;