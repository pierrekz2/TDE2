import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Home from './pages/Home';
import NewGroup from './pages/NewGroup';
import WishList from './pages/WishList';
import NewWish from './pages/NewWish';
import Group from './pages/Groups';
import Profile from './pages/Profile';
import GroupProfile from './pages/GroupProfile';
import NotFound from './pages/NotFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon} />
                <Route path='/register' component={Register} />
                <PrivateRoute path='/home' component={Home} />
                <PrivateRoute path='/groups/new' component={NewGroup} />
                <PrivateRoute path='/wishlist' component={WishList} />
                <PrivateRoute path='/profile' component={Profile} />
                <PrivateRoute path='/wish/new' component={NewWish} />
                <PrivateRoute path='/groups' component={Group} />
                <PrivateRoute path='/group' component={GroupProfile} />
                <Route path='*' component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}