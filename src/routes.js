import React from 'react';
import { Route, Switch, hashHistory } from 'react-router-dom';

import HomePageComponent from 'components/home/container/HomePageComponent';
import LoginComponent from 'components/Login/container/LoginComponent';
import SignupComponent from 'components/Signup/container/SignupComponent';


export default (
    <Switch>
        <Route exact path="/home" component={HomePageComponent}/>
        <Route path="/login" component={LoginComponent}/>
        <Route path="/signup" component={SignupComponent}/>
    </Switch>
);
