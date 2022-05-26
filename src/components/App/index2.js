import React from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import Navigation from '../Navigation';
import WeatherPage from "../Weather";
import Login from '../../screens/Login.jsx';
import Register from '../../screens/Register.jsx';
import Activate from '../../screens/Activate.jsx';
import Private from '../../screens/Private.jsx';
import Admin from '../../screens/Admin.jsx';
import ForgetPassword from '../../screens/ForgetPassword.jsx';
import ResetPassword from '../../screens/ResetPassword.jsx';
import PrivateRoute from '../../Routes/PrivateRoute';
import AdminRoute from '../../Routes/AdminRoute';
/* import './App.css'; */
import 'react-toastify/dist/ReactToastify.css';
const Application = () => (
 
  <Router>

    <Switch>
      <Route path='/' exact render={props => <Navigation {...props} />} />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/register' exact render={props => <Register {...props} />} />
      <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
      <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <PrivateRoute path="/private" exact component={Private} />
       <AdminRoute path="/admin" exact component={Admin} />
       <Route exact path="/weather" component={WeatherPage} />      
      <Redirect to='/' />
    </Switch>
    
 </Router>
 
);
export default Application;