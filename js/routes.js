import React from 'react';
import { Route, Switch, hashHistory } from 'react-router';

import HomePageComponent from 'components/home/container/HomePageComponent';


export default (
    <Switch>
        <Route exact path="/" component={HomePageComponent}/>
    </Switch>
);
