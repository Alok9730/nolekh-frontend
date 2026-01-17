import axios from 'axios';
import toast from 'react-hot-toast';


const instance = axios.create({
    baseURL: "http://192.172.149.143:4000/"
});


instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    return config
});


instance.interceptors.response.use((res) => res , (err)=> {
  if(err.response && (err.response.status === 401 || err.response.status === 403)){
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userId");
    toast.error("session Expired!!")

    setTimeout(() => {
      window.location.href = `/shopkeeper/login`;
    }, 1000);
  }
  return Promise.reject(err);
})
export default instance