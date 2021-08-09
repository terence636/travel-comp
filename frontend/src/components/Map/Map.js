import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import Room from "@material-ui/icons/Room";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({ coordinates, setCoordinates, setBounds, places }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        // onChildClick={''}
      >
        {console.log("places",places)}
      
     
        {places?.length && places?.map((place, i) => (
            //   {console.log(Number(place.latitude))}
            //   {console.log(Number(place.longitude))}
          <div
            // className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
   
            key={i}
          >
            {!isDesktop ? (
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
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(place.rating)}
                  readOnly
                />
              </Paper>
            )}
          </div>
        ))}

        {/* <AnyReactComponent
            lat={35.689487}
            lng={139.691706}
            text="My Marker"
          /> */}
        {/* <Room  lat={1.420181}
            lng={103.864555}/> */}
        {/* <div lat={35.689487}
            lng={139.691706}
           >
                "MARK HERE"
        </div> */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
