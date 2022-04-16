/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";



export  const canPermission = (permission)=>{
    const [userPermissionLocalStorage, setUserPermissionLocalStorage] = useState()

    const userPermission = Cookies.get('user_info') ;
    const userPermissionParse = userPermission ? JSON.parse(userPermission) : userPermissionLocalStorage;
    const userPermissionList = userPermissionParse?.permissionList;
    //return userPermissionList

    useEffect(()=>{
        const locatData = JSON.parse(localStorage.getItem('user_info'));
        setUserPermissionLocalStorage(locatData)
    },[userPermission])
    
   return( 
           (userPermissionList || []).find((p)=> p?.name === permission) ? true : false
       );
}
