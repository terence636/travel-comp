import React from 'react'
import { Route, Switch, Redirect, Link } from "react-router-dom";
import App from './App'
import HomePage from './components/HomePage/HomePage'
import Login from './components/Users/Login'
import Register from './components/Users/Register'
import Chat from './components/Chat/Chat'
import Join from './components/Chat/Join'

const Main = () => {
    return (
        <div>
        {/* <LoggedContext.Provider value={onOff}> */}
        
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/main" component={App} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/chat" component={Chat} />
              <Route path="/join" component={Join} />
             
              {/* <PrivateRoute path="/dashboard/edit" component={EditEvent} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/question" component={Question} />
              <PrivateRoute path="/board" component={Board} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/signupsuccess" component={SignUpSuccess} />
              <PrivateRoute path="/updatesuccess" component={UpdateSuccess} />
              <Redirect to="/" /> */}
            </Switch>
       
        {/* </LoggedContext.Provider> */}
      </div>
    )
}

export default Main
