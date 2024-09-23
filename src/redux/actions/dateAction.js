import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";

export const getAllDate = (accesstoken) => async dispatch => {
  try {
    dispatch({
      type: 'getAllDateRequest',
    });

    const {data} = await axios.get(UrlHelper.ALL_LOCATION_API, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });


    dispatch({
      type: 'getAllDateSuccess',
      payload: data.lotlocations,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);

    dispatch({
      type: 'getAllDateFail',
      payload: error.response.data.message,
    });
  }
};


// Gettting Single Locations
export const getDateDetails = (accesstoken,id) => async dispatch => {
    try {
      dispatch({
        type: 'getDateRequest',
      });
  
      const {data} = await axios.get(UrlHelper.ALL_LOCATION_API+`${id}`, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });
  
      console.log('Data :: ' + data.lotlocations);
  
      dispatch({ 
        type: 'getDateSuccess',
        payload: data.lotlocations,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
  
      dispatch({
        type: 'getDateFail',
        payload: error.response.data.message,
      });
    }
  };


  export const getDateAccordingToLocationAndTime = (accesstoken,lottimeId,lotlocationId) => async dispatch => {
    try {
      dispatch({
        type: 'getAllDateRequest',
      });

      const url = UrlHelper.DATE_API+"?lottimeId="+`${lottimeId}`+"&lotlocationId="+`${lotlocationId}`;

      console.log("URL :: "+url)
  
      const {data} = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      // Reverse the order of the lotdates array
    const reversedLotDates = data.lotdates;

    dispatch({
      type: 'getAllDateSuccess',
      payload: reversedLotDates,
    });

  
      // dispatch({
      //   type: 'getAllDateSuccess',
      //   payload: data.lotdates,
      // });

    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
  
      dispatch({
        type: 'getAllDateFail',
        payload: error.response.data.message,
      });
    }
  };


  // For Creating Date
export const createDate =
(accesstoken, lottime,lotdate) => async dispatch => {
  try {
    dispatch({
      type: 'createDateRequest',
    });

    const {data} = await axios.post(
      UrlHelper.CREATE_DATE_API,
      {
        lotdate,
        lottime,
      },
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Data :: ' + data.message);

    dispatch({
      type: 'createDateSuccess',
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);

    dispatch({
      type: 'createDatefail',
      payload: error.response.data.message,
    });
  }
};

