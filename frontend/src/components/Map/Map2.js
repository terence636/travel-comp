import React, {createRef} from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import { Box } from "@material-ui/core"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map2 = ({ coordinates, setCoordinates, setBounds, places, setChildClicked, weatherData, weatherCheckBox }) => {
  const classes = useStyles();
  const refMap = React.createRef()
  const containerStyle = {
    width: '80wh',
    height: '90vh'
  };

  const center = {
    lat: 1.3973207,
    lng: 103.9156448
  };

  const handleClick = () => {

  }

  const handleBoundsChanged = () => {
    console.log("handleBoundsChanged")
    // const lat = refMap.current.getCenter().lat()
    // const lng = refMap.current.getCenter().lng()
    console.log({refMap})
  }

  const handleOnLoad = (map) => {

    console.log({map})
  }

  return (
    <div className={classes.mapContainer}>
      <GoogleMap
        ref={refMap}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        onBoundsChanged={handleBoundsChanged}
        onLoad={handleOnLoad}
        // margin={[50, 50, 50, 50]}
        // options={{ disableDefaultUI: true, zoomControl: true}}
        // onChange={(e) => {
        //   // console.log(e);
        //   setCoordinates({ lat: e.center.lat, lng: e.center.lng });
        //   setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        // }}
        // onChildClick={(child) => {setChildClicked(child)}}
      >

    {/* {!weatherCheckBox && places?.map((place, i) => (
          <Box
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
      
                <Typography
                className={classes.typography}
                variant="subtitle2"
                gutterBottom
                >
                  {place.name}
                </Typography>
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
          </Box>
        ))} */}
    
        {/* {weatherData?.list?.map((data,i)=>(
            <Box key={i} lat={data.coord.lat} lng={data.coord.lon}>
                <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather" height="100px" />
            </Box>
        ))} */}

        <Marker  position={{lat:center.lat,
            lng:center.lng}}
            onClick={handleClick}/>
      </GoogleMap>
    </div>
  );
};

export default Map2;
