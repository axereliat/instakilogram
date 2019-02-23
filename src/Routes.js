import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from "./components/home/Home";
import NotFound from "./components/errors/NotFound";
import axios from 'axios';
import {Auth} from "./api/auth";
import Register from "./components/auth/Register";
const Routes = () => {
    if (Auth.getToken()) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Auth.getToken();
    }
    return <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={Register}/>
        <Route component={NotFound}/>
    </Switch>
};

export default Routes
