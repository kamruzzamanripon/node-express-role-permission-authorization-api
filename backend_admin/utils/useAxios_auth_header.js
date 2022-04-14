import axios from 'axios';
import { parseCookies } from 'nookies';

export const axiosInstance =  () =>{
    const cookies = parseCookies()
    const {jwt_backend} = parseCookies() ? parseCookies() : ""
    const token = jwt_backend ? jwt_backend : ""
    //console.log({ cookies })
    //console.log("Token", token)
    
    const axiosClient = axios.create({
        withCredentials: true,
        headers:{
            'Authorization': `${token}`,
            'content-type': 'application/json'
          },
          
     });    
     return axiosClient    
  }