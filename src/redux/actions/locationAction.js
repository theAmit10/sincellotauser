import axios from 'axios';
import UrlHelper from '../../helper/UrlHelper';
import Toast from 'react-native-toast-message';

// Gettting All Locations
export const getAllLocations = accesstoken => async dispatch => {
  try {
    dispatch({
      type: 'getAllLocationRequest',
    });

    const {data} = await axios.get(UrlHelper.ALL_LOCATION_API, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });

    // console.log('Data :: ' + data.lotlocations[0].lotlocation);

    dispatch({
      type: 'getAllLocationSuccess',
      payload: data.lotlocations,
    });

    console.log('Location data :: ' + data.lotlocations);
    console.log('Location data length :: ' + data.lotlocations.length);
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);

    dispatch({
      type: 'getAllLocationFail',
      payload: error.response.data.message,
    });
  }
};

// Gettting Single Locations
export const getLocationDetails = (accesstoken, id) => async dispatch => {
  try {
    dispatch({
      type: 'getLocationRequest',
    });

    const {data} = await axios.get(UrlHelper.ALL_LOCATION_API + `${id}`, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });

    console.log('Data :: ' + data.lotlocations);

    dispatch({
      type: 'getLocationSuccess',
      payload: data.lotlocations,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);

    dispatch({
      type: 'getLocationFail',
      payload: error.response.data.message,
    });
  }
};

// Creating Locations
export const createLocation = (accesstoken, lotlocation,maximumRange) => async dispatch => {
  try {
    dispatch({
      type: 'createLocationRequest',
    });

    const {data} = await axios.post(
      UrlHelper.CREATE_LOCATION_API,
      {
        lotlocation: lotlocation,
        maximumRange: maximumRange,
      },
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      },
    );

    console.log('Data :: ' + data.message);

    dispatch({
      type: 'createLocationSuccess',
      payload: data.message,
    });

    Toast.show({
      type: 'success',
      text1: data.message,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);

    dispatch({
      type: 'createLocationFail',
      payload: error.response.data.message,
    });
  }
};
