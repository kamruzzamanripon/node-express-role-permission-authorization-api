/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";



export  const canRole = (role)=>{
    const [userPermissionLocalStorage, setUserPermissionLocalStorage] = useState()

    const userPermission = Cookies.get('user_info');
    const userPermissionParse = userPermission ? JSON.parse(userPermission) : userPermissionLocalStorage;
    const userPermissionList = userPermissionParse;
    //return userPermissionList

    useEffect(()=>{
        const locatData = JSON.parse(localStorage.getItem('user_info'));
        setUserPermissionLocalStorage(locatData)
    },[])
    
   return( 
       //console.log("userPermissionList", userPermissionList)
            userPermissionList?.role === role ? true : false
       );
}
