import { HYDRATE } from "next-redux-wrapper";
import reducers from "./reducers";



const reducer = (state, action) => { 
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload
        };
    }
    return reducers(state, action);
    
}


export default reducer;