import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";

export const getAllResult = (accesstoken) => async dispatch => {
  try {
    dispatch({
      type: 'getAllResultRequest',
    });

    const {data} = await axios.get(UrlHelper.ALL_LOCATION_API, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });


    dispatch({
      type: 'getAllResultSuccess',
      payload: data.lotlocations,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);

    dispatch({
      type: 'getAllResultFail',
      payload: error.response.data.message,
    });
  }
};


// Gettting Single Result
export const getResultDetails = (accesstoken,id) => async dispatch => {
    try {
      dispatch({
        type: 'getResultRequest',
      });
  
      const {data} = await axios.get(UrlHelper.ALL_LOCATION_API+`${id}`, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });
  
      console.log('Data :: ' + data.lotlocations);
  
      dispatch({ 
        type: 'getResultSuccess',
        payload: data.lotlocations,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
  
      dispatch({
        type: 'getResultFail',
        payload: error.response.data.message,
      });
    }
  };
