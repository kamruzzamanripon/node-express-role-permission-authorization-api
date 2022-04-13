/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const ifLogin = (WrappedComponent) => {
    return (props) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== "undefined") {
          const Router = useRouter();
    
          const jwt_backend = Cookies.get('jwt_backend'); 
    
          // If there is no access token we redirect to "/" page.
          if (jwt_backend) {
            Router.replace("/");
            return null;
          }
    
          // If this is an accessToken we just render the component that was passed with all its props
    
          return <WrappedComponent {...props} />;
        }
    
        // If we are on server, return null
        return null;
      };
};

export default ifLogin;