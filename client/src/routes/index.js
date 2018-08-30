import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Share from '../pages/Share';
import { ViewerContext } from '../context/ViewerProvider';
import Appbar from '../components/Appbar/Appbar';




export default () => (
    <ViewerContext.Consumer>
      {({ loading, viewer, error }) => {
        if (loading) return 'loading'
        if (!viewer) {
          return (
            <Switch>
              <Route exact path='/welcome' name='home' component={Home} />
                <Redirect from='*' to='/welcome' />
            </Switch>              
          )
        }
        return (
          <React.Fragment> 
            <Appbar />              
            <Switch>
              
              <Route exact path="/items"  component={Items} />      
              <Route exact path="/profile"  component={Profile} />
              <Route exact path="/profile/:userid"  component={Profile} />
              <Route exact path="/share"  component={Share} />

              <Redirect to="/items"  component={Items} />  
              <Redirect from="/" exact to="/items" component={Items} />
                      
            </Switch>
          </React.Fragment>
        )
      }}
    </ViewerContext.Consumer>
)



