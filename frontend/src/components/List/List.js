import React, { useState, useEffect, createRef } from "react";
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

const List = ({places, childClicked, isLoading, type, rating, setType, setRating, setWeatherCheckBox, weatherCheckBox}) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    
    // const onClickWeatherCheckBox = (event) => {
    //     // console.log("weatherbox", event.target.checked)
    //     setWeatherCheckBox(event.target.checked);
    //   };

    // console.log({ childClicked })
  
   useEffect(()=> {
    const refs = Array(places?.length).fill().map((_,i)=> elRefs[i] || createRef());
    console.log({refs})
    setElRefs(refs);
   }, [places])

   const handleSetType = (e) => {
    console.log("List.js", {e})
    console.log("List.js",e.target.value)
    setType(e.target.value)
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
            {/* <Select value={type} onChange={(e)=>setType(e.target.value)}> */}
            <Select value={type} onChange={(e)=>handleSetType(e)}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
                <MenuItem value="weather">Weather</MenuItem>
            </Select>
        </FormControl>
        {<FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4.0}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
        </FormControl> }
        <FormControlLabel
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
        <Grid container spacing={3} className={classes.list}>
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
        </>
        )}
    </div>
  );
};

export default List;
