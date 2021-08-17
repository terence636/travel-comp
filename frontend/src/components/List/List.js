import React, { useState, useEffect, createRef, useContext } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from './styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chat from '../Chat/Chat'
import Join from '../Chat/Join'
import { Context } from "../../Main.js";

const List = ({places, childClicked, isLoading, type, rating, setType, setRating, setWeatherCheckBox, weatherCheckBox, room}) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const [chatBox, setChatBox] = useState(false);
    const [nickname, setNickname] = useState('');
    
    const contextValue = useContext(Context);
    // console.log({ childClicked })
  
   useEffect(()=> {
    const refs = Array(places?.length).fill().map((_,i)=> elRefs[i] || createRef());
    // console.log({refs})
    setElRefs(refs);
    setChatBox(false)
    setNickname('')
   }, [places])

  //  const handleSetType = (e) => {
  //   // console.log("List.js", {e})
  //   // console.log("List.js",e.target.value)
  //   setType(e.target.value)
  //  }
  const handleChatBox = (e) => {
    setChatBox(e.target.checked)
    setNickname('')
  }

  return (
    <div className={classes.container}>
        <Typography variant="h5">
            Restaurants, Hotels & Attractions around you
        </Typography>
        {isLoading ? (
            <div className={classes.loading}>
                <CircularProgress size="5rem" />
            </div>
        ): (
            <>
        <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e)=>setType(e.target.value)}>
            {/* <Select value={type} onChange={(e)=>handleSetType(e)}> */}
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
                {/* <MenuItem value="weather">Weather</MenuItem> */}
            </Select>
        </FormControl>
        {<FormControl className={classes.formControlRating}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>&gt;3.0</MenuItem>
                <MenuItem value={4.0}>&gt;4.0</MenuItem>
                {/* <MenuItem value={4.5}>Above 4.5</MenuItem> */}
            </Select>
        </FormControl> }
        <FormControlLabel className={classes.formControlLabel}
        control={
          <Checkbox
            checked={weatherCheckBox}
            onChange={(e)=>setWeatherCheckBox(e.target.checked)}
            name="check"
            color="primary"
          />
        }
        label="Weather Only"
      />
       <FormControlLabel className={classes.formControlLabel}
        control={
          <Checkbox
            checked={chatBox}
            // onChange={(e)=>setChatBox(e.target.checked)}
            onChange={(e)=>handleChatBox(e)}
            name="check"
            color="primary"
          />
        }
        label="Chat"
      />
      {chatBox && <Chat nickname={contextValue.logState.username} room={room}/>}
      {/* {chatBox && nickname && <Chat nickname={nickname} room={room}/>} */}
      {/* {chatBox && !nickname && <Join setNickname={setNickname} /> } */}
      {!chatBox && <Grid container spacing={3} className={classes.list}>
            {places?.map((place,i)=>(
                <Grid ref={elRefs[i]} item key={i} xs={12}>
                    <PlaceDetails 
                        place={place}
                        selected={Number(childClicked) === i}
                        refProp={elRefs[i]}
                    />
                </Grid>
            ))}
        </Grid>
         }
        </>
        )}
    </div>
  );
};

export default List;
