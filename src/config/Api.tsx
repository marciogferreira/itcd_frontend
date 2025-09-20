import axios from 'axios';
import Util from './Util';
import Message from './Message';

const Api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    // baseURL: 'https://api.itcd.org.br/api/',
});

Api.interceptors.request.use(function (config: any) {
  config.headers['Authorization'] = `Bearer ${Util.getToken()}`;
  return config;
}, function (error: any) {
  return Promise.reject(error);
});

Api.interceptors.response.use(function (response: any) {
    return response;
  }, function (error: any) {
    
    if(!error.response) {
      // Util.removeToken();
    }
    
    if(error.response) {
      const { message } = error.response.data;
      const errorMessage = error.response.data.error;
      
      if(message == 'Unauthenticated.' || message == 'Unauthenticated') {
        Util.removeToken();
        Util.redirect();
      }
      if(message) {
        Message.error(message);
      }
      
      if(errorMessage) {
        Message.error(errorMessage);
      } else {
        Message.error(message);
      }
    }

    if(error.response.status === 401) {
      Util.removeToken();
      Util.redirect();
    }
    
    return Promise.reject(error);
  });

export default Api;