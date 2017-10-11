import React from 'react';
import { Route, Switch, hashHistory } from 'react-router-dom';

import HomePageComponent from 'components/home/container/HomePageComponent';
import LoginComponent from 'components/Login/container/LoginComponent';


export default (
    <Switch>
        <Route exact path="/home" component={HomePageComponent}/>
        <Route path="/login" component={LoginComponent}/>
    </Switch>
);
