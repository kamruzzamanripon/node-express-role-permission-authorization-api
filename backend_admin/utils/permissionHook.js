import Cookies from "js-cookie";



export  const canPermission = (permission)=>{

    const userPermission = Cookies.get('user_info');
    const userPermissionParse = userPermission ? JSON.parse(userPermission) : [];
    const userPermissionList = userPermissionParse?.permissionList;
    //return userPermissionList
   return( 
           (userPermissionList || []).find((p)=> p.name === permission) ? true : false
       );
}
