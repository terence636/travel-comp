import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { makeStyles } from "@material-ui/core/styles";
import { getPlacesData } from "./api/index";

const useStyles = makeStyles((theme) => ({
  grid1: {
    backgroundColor: "orange",
  },
  grid2: {
    backgroundColor: "green",
  },
}));

const App = () => {
  const classes = useStyles();
  const [places, setPlaces] = useState();
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(( pos )=>{
        setCoordinates( {lat: pos.coords.latitude, lng: pos.coords.longitude} )
    })
  },[])

  useEffect(() => {
    console.log(coordinates, bounds)
    getPlacesData(bounds?.sw, bounds?.ne).then((data)=>{
        console.log(data);
        setPlaces(data);
    });
    
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline>
        <Header />
        <Grid container spacing={2} style={{ width: "100%" }}>
          <Grid item xs={12} md={4}>
            <div className={classes.grid1}>
              <List places={places}/>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className={classes.grid2}>
              <Map
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                places={places} />
            </div>
          </Grid>
        </Grid>
      </CssBaseline>
    </>
  );
};

export default App;
