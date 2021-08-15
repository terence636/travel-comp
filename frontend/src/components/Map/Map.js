import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import { Box } from "@material-ui/core"
// import Room from "@material-ui/icons/Room";
// import Popover from '@material-ui/core/Popover';
// import Axios from 'axios'

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({ coordinates, setCoordinates, setBounds, places, setChildClicked, weatherData, weatherCheckBox }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:640px)');
  // const handleApiLoaded = (map, maps) => {
  //   // use map and maps objects
  // };
  
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        // defaultCenter={coordinates}
        defaultCenter={{lat:1.420181,lng:103.864555}}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {setChildClicked(child)}}
        // yesIWantToUseGoogleMapApiInternals = {true}
        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        // $hover={"false"}
      >

    {!weatherCheckBox && places?.map((place, i) => (
          <Box
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {
              !isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt={place.name}  
                  />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(place.rating)}
                  readOnly
                />
                </Paper>
              )
            } 
          </Box>
        ))}
    
        {weatherData?.list?.map((data,i)=>(
            <Box key={i} lat={data.coord.lat} lng={data.coord.lon}>
                <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather" height="100px" />
            </Box>
        ))}
   
        {/* <Room  lat={1.420181}
            lng={103.864555}
            onClick={handleClick}/> */}
       {/* <Popover
        lat={1.420181}
        lng={103.864555}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      > */}
        {/* <Typography className={classes.typography}>The content of the Popover.</Typography> */}
        {/* <div className="image-uploader">     
              <input
                  name="image"
                  type="file"
                  onChange={(e) => {
                    console.log({e})
                    setUploadImage(e.target.files[0]);
                  }}
                  accept=".jpg,.jpeg,.gif,.png"
                />
              </div>
              <div className="image-uploader">
                <button onClick={upload} class="upload-image-btn">
                  Upload Image
                </button>
              </div>
        </Popover> */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
