import React from 'react';
import { Route, Switch, hashHistory } from 'react-router-dom';

import HomePageComponent from 'components/home/container/HomePageComponent';
import LoginComponent from 'components/Login/container/LoginComponent';
import TraineeComponent from 'components/Management/Trainee/container/TraineeComponent';
import TrainingPackageComponent from 'components/Management/TrainingPackage/container/TrainingPackageComponent';
import TraineeDashboardComponent from 'components/Management/Dashboards/container/TraineeDashboardComponent';
import ExerciseComponent from 'components/Management/Exercise/container/ExerciseComponent';
import PaymentComponent from 'components/Management/Payment/container/PaymentComponent';
import WorkoutComponent from 'components//Management/Dashboards/container/WorkoutComponent';
import SettingsComponent from 'components//Management/Dashboards/container/SettingsComponent';
import PaymentDashboardComponent from 'components/Management/Dashboards/container/PaymentDashboardComponent';
import ScheduledExerciseComponent from 'components/Management/ScheduledExercise/container/ScheduledExerciseComponent';
import ScheduleComponent from 'components/Management/Schedule/container/ScheduleComponent';


export default (
    <Switch>
        <Route exact path="/" component={TraineeDashboardComponent}/>
        <Route path="/traineeWorkout" component={WorkoutComponent}/>
        <Route path="/paymentDashboard" component={PaymentDashboardComponent}/>
        <Route path="/login" component={LoginComponent}/>
        <Route path="/trainee" component={TraineeComponent}/>
        <Route path="/trainingPackage" component={TrainingPackageComponent}/>
        <Route path="/exercise" component={ExerciseComponent}/>
        <Route path="/payment" component={PaymentComponent}/>
        <Route path="/schedule" component={ScheduleComponent}/>
        <Route path="/settings" component={SettingsComponent}/>
        <Route path="/scheduledExercise" component={ScheduledExerciseComponent}/>
    </Switch>
);
