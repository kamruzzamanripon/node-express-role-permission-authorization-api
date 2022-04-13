import Cookies from "js-cookie";



export  const canRole = (role)=>{

    const userPermission = Cookies.get('user_info');
    const userPermissionParse = userPermission ? JSON.parse(userPermission) : [];
    const userPermissionList = userPermissionParse;
    //return userPermissionList
   return( 
            userPermissionList.role === role ? true : false
       );
}
