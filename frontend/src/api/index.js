import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';


  

export const getPlacesData = async (sw,ne) => {
    const options = {
        method: 'GET',
        params: {
          bl_latitude: sw?.lat,
          tr_latitude: ne?.lat,
          bl_longitude: sw?.lng,
          tr_longitude: ne?.lng,
        },
        headers: {
          'x-rapidapi-key': '586e845348mshedbb6c8a3ed1868p10b372jsnc06fa5e9f8cf',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
        }
      };

    try {
        const { data: {data} } = await axios.get(URL, options);
        return data;
    } catch {

    }
}