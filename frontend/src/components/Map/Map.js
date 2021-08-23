import React, { useState, useEffect, useContext } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography } from "@material-ui/core";
import LocationOnSharpIcon from '@material-ui/icons/LocationOnSharp';
import AddLocationSharpIcon from "@material-ui/icons/AddLocationSharp";
import LogEntryForm from './LogEntryForm'
import { listLogEntries } from '../../api/LogEntriesApi'
import { deleteLogEntry } from '../../api/LogEntriesApi';
import useStyles from "./styles";
import { Box } from "@material-ui/core"
import { Context } from "../../Main.js";
const isIcon = false;

const Map = ({ coordinates, setCoordinates, setBounds, places, setChildClicked, weatherData, logCheckBox }) => {
  const classes = useStyles();
 
  const [logEntries, setLogEntries] = useState([])
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [isEntryFormActive, setIsEntryFormActive] = useState(false);
  const [isLogEntryShown, setIsLogEntryShown] = useState(false)
  const [renderScreen, setRenderScreen] = useState(false)
  const contextValue = useContext(Context);

  const username = contextValue.logState.username;
  const showAddMarkerPopup = ({x, y, lat, lng, event}) => {
    if(isEntryFormActive || isLogEntryShown || !logCheckBox)
      return
    setAddEntryLocation({lat,lng,});
    setIsEntryFormActive(true)
  }

  const handleChildMouseEnter = (e) => {
    console.log({e})
  }

  const getEntries = async () => {
    console.log({username})
    const logEntries = await listLogEntries(username);
    console.log({logEntries})
    setLogEntries(logEntries);
  };

  useEffect(() => {
    console.log("hey")
    getEntries();
  },[addEntryLocation, renderScreen]);

  const handleShowLogEntryClick = (entry) => {
    setShowPopup({[entry._id]:true})
    setIsLogEntryShown(true)
  }

  const handleCloseLogEntryClick = (entry) => {
    setShowPopup({[entry._id]:false})
    setIsLogEntryShown(false)
  }

  const handleDeleteLogEntryClick = async (entry) => {
    try {
      await deleteLogEntry(entry); 
      setRenderScreen(!renderScreen)
      setIsLogEntryShown(false)
    } catch (error) {
      console.error(error);
    }
  }
 

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        // defaultCenter={coordinates}
        defaultCenter={{lat:1.420181,lng:103.864555}}
        center={coordinates}
        defaultZoom={16}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true}}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {setChildClicked(child)}}
        onClick={showAddMarkerPopup}
        onChildMouseEnter={handleChildMouseEnter}
      >
      {
          logCheckBox && logEntries.map(entry => (
            <Box
              lat={entry.latitude}
              lng={entry.longitude}
              key={entry._id}
            >
            <AddLocationSharpIcon color="secondary"
              style={{cursor:'pointer'}}
              onClick={()=>handleShowLogEntryClick(entry)}/>
              {showPopup[entry._id] ? 
                 <div className="popup">
                 <h3>{entry.title}</h3>
                 <p>{entry.comments}</p>
                 <p>{entry.description}</p>
                 <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small><br />
                 <button onClick={()=>handleCloseLogEntryClick(entry)}>Close</button>
                 <button onClick={()=>handleDeleteLogEntryClick(entry)}>Delete</button>
               </div>
            
              : null}
            </Box>
           
          ))
      }

      {
          addEntryLocation ? (
          <Box 
              lat={addEntryLocation.lat}
              lng={addEntryLocation.lng}  
          >
            <AddLocationSharpIcon color="secondary"
              style={{cursor:'pointer'}}
              />
            <LogEntryForm onClose={() => {
                setAddEntryLocation(null);
                setIsEntryFormActive(false)
                // getEntries();
              }} location={addEntryLocation} />
          </Box>) : null

      } 

      {!logCheckBox && places?.map((place, i) => (
          <Box
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {
              isIcon ? (
                <>
                <LocationOnSharpIcon style={{cursor:'pointer'}} color="action" fontSize="large" />
                </>
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
                {/* <Rating
                  name="read-only"
                  size="small"
                  value={Number(place.rating)}
                  readOnly
                // /> */}
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

      </GoogleMapReact>
    </div>
  );
};

export default Map;
