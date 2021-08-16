import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {

  console.log("GetPlacesData",{type})
  const URL =
    `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
  const options = {
    method: "GET",
    params: {
      bl_latitude: sw?.lat,
      bl_longitude: sw?.lng,
      tr_latitude: ne?.lat,
      tr_longitude: ne?.lng,
    },
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_TRAVEL_ADVISOR_API_KEY,
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  try {
    const {
      data: { data },
    } = await axios.get(URL, options);
    return data;
    // const response = await axios.get(URL, options);
    // return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getWeatherData = async ({lat,lng}) => {

  // console.log("GetWeatherData",{type})
  const URL =
    `https://community-open-weather-map.p.rapidapi.com/find`;

 const options = {
  method: 'GET',
  params: {
    lat: lat,
    lon: lng,
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_WEATHER_DATA_API_KEY,
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
  }
};

  try {
    const { data } = await axios.get(URL, options);
    // console.log("API",{data})
    return data;
    // const response = await axios.get(URL, options);
    // return response.data.data;
  } catch (err) {
    console.log(err);
  }
};