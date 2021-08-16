import React, { useState, useContext } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './styles'
import { LoggedContext } from "../../Main.js";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";


const Header = ({ setCoordinates, setRoom }) => {
    const classes = useStyles()
    const [autocomplete, setAutocomplete] = useState(null)
    const loggedContext = useContext(LoggedContext);
    const history = useHistory();
    const onLoad = (autoC) => setAutocomplete(autoC)
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry?.location?.lat();
        const lng = autocomplete.getPlace().geometry?.location?.lng();
        // console.log(autocomplete.getPlace())
        console.log(autocomplete.getPlace()?.name)
        if(lat && lng) {
            setCoordinates({ lat,lng })
            setRoom(autocomplete.getPlace()?.name)
        }
    }
    const handleLogout = (event) => {
        event.preventDefault();
        fetch("/sessions", {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });
        history.push("/");
        loggedContext.setLogState();
    };

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Companion
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput}} />
                        </div>
                    </Autocomplete>
                    <Typography variant="h6" className={classes.title}>
                        {/* <Link to="/login">Logout</Link> */}
                        <div onClick={handleLogout} className={classes.logout}>Logout</div>
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
