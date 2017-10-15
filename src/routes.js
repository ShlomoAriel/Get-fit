import React from 'react';
import { Route, Switch, hashHistory } from 'react-router-dom';

import HomePageComponent from 'components/home/container/HomePageComponent';
import LoginComponent from 'components/Login/container/LoginComponent';
import TraineeComponent from 'components/Trainee/container/TraineeComponent';
import TrainingPackageComponent from 'components/TrainingPackage/container/TrainingPackageComponent';
import ExerciseComponent from 'components/Exercise/container/ExerciseComponent';


export default (
    <Switch>
        <Route exact path="/home" component={HomePageComponent}/>
        <Route path="/login" component={LoginComponent}/>
        <Route path="/trainee" component={TraineeComponent}/>
        <Route path="/trainingPackage" component={TrainingPackageComponent}/>
        <Route path="/exercise" component={ExerciseComponent}/>
    </Switch>
);
