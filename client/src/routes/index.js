import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Share from '../pages/Share';



export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    
    <Switch>
      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share Done
       * 
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
      */}
            <Route exact path="/items"  component={Items} />
            <Route exact path="/welcome"  component={Home} />
            <Route exact path="/profile"  component={Profile} />
            <Route exact path="/profile/:id"  component={Profile} />
            <Route exact path="/share"  component={Share} />
            <Redirect to="/items"  component={Items} />
                  
    </Switch>
  </Fragment>
)
