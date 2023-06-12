import axios from "axios";
import { BASE_URL } from "./constants";
import { getUserToken } from "./getUserToken";




axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";


axios.interceptors.request.use(
    config => {
        
      const token = getUserToken();
      console.log("intercept axios",token);
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      // config.headers['Content-Type'] = 'application/json';
      return config
    },
    error => {
      Promise.reject(error)
    }
  )



export default axios;