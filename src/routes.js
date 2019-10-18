import React from 'react'
import { isAuthenticated } from './auth'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'


const PrivateRoute = ( { component: Component, ...rest} ) => (
    <Route 
        { ... rest } 
        render={props => 
            isAuthenticated() ? (
                <Component { ... props } />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
        }
    />
);

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path = "/" component= { Home } />
                <Route exact path = "/login" component= { Login } />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;