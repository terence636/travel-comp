import React, { useState, createContext } from 'react'
import { Route, Switch, Redirect, Link } from "react-router-dom";
import App from './App'
import Login from './components/Users/Login'
import Register from './components/Users/Register'

export const Context = createContext();

const Main = () => {
  const [logState, setLogState] = useState();
  const contextValue = { logState, setLogState };
  
  const PrivateRoute = ({component: Component, handleChildFunc, ...rest}) => {
    return <Route {...rest} render={(props) => (
      logState !== undefined
      ? <Component {...props} handleChildFunc={handleChildFunc}/>
      :<div className="center"><button className="btstyle"><Link to="/login">Please Login To Access</Link></button></div>
    )}
    />
  }

    return (
        <div>
        <Context.Provider value={contextValue}>
            <Switch>
              <Route exact path ="/"><Redirect to="/login" /></Route>
              <PrivateRoute path="/main" component={App} />
               {/* <Route path="/main" component={App} /> */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
       
        </Context.Provider>
      </div>
    )
}

export default Main
