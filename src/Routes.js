import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from "./components/home/Home";
import NotFound from "./components/errors/NotFound";
import axios from 'axios';
import {Auth} from "./api/auth";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {PrivateRoute} from "./PrivateRoute";
import Create from "./components/posts/Create";
import FindFriends from "./components/users/FindFriends";
import Profile from "./components/users/Profile";
import {AdminRoute} from "./AdminRoute";
import AdminUsers from "./components/admin/AdminUsers";

const Routes = () => {
    if (Auth.getToken()) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Auth.getToken();
    }
    return <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/profile/:id' component={Profile}/>
        <PrivateRoute path='/posts/create' component={Create}/>
        <PrivateRoute path='/findFriends' component={FindFriends}/>
        <AdminRoute path='/admin/users' component={AdminUsers}/>
        <Route component={NotFound}/>
    </Switch>
};

export default Routes
