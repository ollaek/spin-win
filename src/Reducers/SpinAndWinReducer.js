
import { 
    GET_CONFIGURATIONS,
    GET_SELECTED_OFFER,
    SUBSCRIBE_TO_OFFER,
    GET_OFFER_IMAGE
 } from "../Actions/Types";

 export default ( state = {} , action ) => {
    switch( action.type ){
        case GET_CONFIGURATIONS: 
            return { ...state , configurations : action.payload };
        case GET_SELECTED_OFFER: 
            return { ...state , selectedOffer : action.payload };
        case SUBSCRIBE_TO_OFFER: 
            return { ...state , subscripeStatus : action.payload };
        case GET_OFFER_IMAGE: 
            return { ...state , Offer : action.payload };
        default : 
            return state;
    }
 };