import React, { useState, useEffect } from "react";
import { CircularProgress, CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { makeStyles } from "@material-ui/core/styles";
import { getPlacesData, getWeatherData } from "./api/api";

const useStyles = makeStyles((theme) => ({
  grid1: {
    backgroundColor: "orange",
  },
  grid2: {
    backgroundColor: "white",
  },
    loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
}));

const App = () => {
  const classes = useStyles();
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false)
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [weatherCheckBox, setWeatherCheckBox] = useState(false)
  const [room, setRoom] = useState('Singapore')

  // TO GET THE CURRENT GPS POSITION WHEN LOADING FIRST TIME
  // SUBSEQUENT CHANGES ARE BY setCoord and setBounds when
  // map changes
  useEffect(() => {
    setIsMapLoading(true)
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setIsMapLoading(false)
    });
  }, []);

  // FILTER PLACES ACCORDING TO RATING
  useEffect(()=>{
    const filter = places?.filter((place)=>place.rating > rating)
    setFilteredPlaces(filter)
  }, [rating,places])

  // TO GET PLACES DATA FROM RAPID API
  // console.log({bounds})

  useEffect(() => {
    setIsLoading(true);
    if (bounds.ne && bounds.sw ) {
       getWeatherData(coordinates)
       .then((data) => {
         console.log({data})
         setWeatherData(data)
       })
       .catch((err)=>console.log(err))


      getPlacesData(type, bounds?.sw, bounds?.ne)
        .then((data) => {
          console.log({ data });
          const filterData = data?.filter(
            (place) => !place.hasOwnProperty("ad_position") && place.name && place.num_reviews > 0
          );
          console.log({ filterData });
          setPlaces(filterData);
          setFilteredPlaces([]);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [bounds, type]);

  return (
    <>
      <CssBaseline>
        <Header setCoordinates={setCoordinates} setRoom={setRoom} />
        <Grid container spacing={1} style={{ width: "100%" }}>
          <Grid item xs={12} md={4}>
            <div className={classes.grid1}>
              <List
                places={filteredPlaces.length !== 0 ? filteredPlaces : places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                weatherCheckBox={weatherCheckBox}
                setWeatherCheckBox={setWeatherCheckBox}
                room={room}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div>
              {isMapLoading ? (
                   <div className={classes.loading}>
                   <CircularProgress size="5rem" />
                   </div>
              ) : (
              <Map
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                places={filteredPlaces.length !== 0 ? filteredPlaces : places}
                setChildClicked={setChildClicked}
                weatherData={weatherData}
                type={type}
                weatherCheckBox={weatherCheckBox}
              />
              )}
            </div>
          </Grid>
        </Grid>
      </CssBaseline>
    </>
  );
};

export default App;
