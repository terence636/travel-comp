import React, { useState, createContext } from 'react'
import { Route, Switch, Redirect, Link } from "react-router-dom";
import App from './App'
import Login from './components/Users/Login'
import Register from './components/Users/Register'

export const LoggedContext = createContext();

const Main = () => {
  const [logState, setLogState] = useState();
  const contextState = { logState, setLogState };
  
  const PrivateRoute = ({component: Component, handleChildFunc, ...rest}) => {
    return <Route {...rest} render={(props) => (
      logState !== undefined
      ? <Component {...props} handleChildFunc={handleChildFunc}/>
      :<div className="center">Please Login To Access<br/><button className="btstyle"><Link to="/login">Login</Link></button></div>
    )}
    />
  }

    return (
        <div>
        <LoggedContext.Provider value={contextState}>
        
            <Switch>
              <Route exact path ="/"><Redirect to="/login" /></Route>
              <PrivateRoute path="/main" component={App} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
       
        </LoggedContext.Provider>
      </div>
    )
}

export default Main
