import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Items from '../pages/Items/Items';
import Profile from '../pages/Profile/Profile';
import Welcome from '../pages/Home/Home';
import Share from '../pages/Share/Share';



export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <Switch>
      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       * 
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */
          <div>
            <Route path="/items" exact component={Items} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/" exact component={Welcome} />
            <Route path="/share" exact component={Share} />
          </div>   
      }
    </Switch>
  </Fragment>
)
