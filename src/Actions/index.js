import Couponz from "../Apis/Couponz";
import { 
    GET_CONFIGURATIONS,
    GET_SELECTED_OFFER,
    SUBSCRIBE_TO_OFFER,
    GET_OFFER_IMAGE
} from "./Types";
import history from "../history";

export const getConfigurations = (groupName) => async dispatch => {
    const response = await Couponz.get(`api/SpinAndWin/GetSpinAndWinUIConfigurations?groupName=${groupName}`);
  
    dispatch({type : GET_CONFIGURATIONS, payload : response.data});
};

export const getSelectedOffer = (msisdn, groupName ) => async dispatch => {
    const response = await Couponz.get(`api/SpinAndWin/GetSpinAndWinOffer?msisdn=${msisdn}&groupName=${groupName}`);
    
    dispatch({type : GET_SELECTED_OFFER, payload : response.data});
    
};

export const subscribeToOffer = (msisdn, offerNumber, offerId) => async dispatch => {
    const response = await Couponz.get(`api/couponz/subscribetooffer?environment=flex&msisdn=${msisdn}&offernumber=${offerNumber}&rateplan=419&channel=OnLine&forceXmlResult=false`);
  
    dispatch({type : SUBSCRIBE_TO_OFFER, payload : response.data});
    if(response.data.ErrorCode === 0){
        history.push(`/Gift/${offerId}`);
    }else{
        history.push("/ErrorPage");
    }
};

export const getOfferImage = (offerId) => async dispatch => {
    const response = await Couponz.get(`api/Deals/getdealdetails?offerId=${offerId}`);
  
    dispatch({type : GET_OFFER_IMAGE, payload : response.data});
};