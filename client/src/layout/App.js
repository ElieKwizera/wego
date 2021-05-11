import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch,useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';


import NavBar from "../components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forgot from "../pages/Forgot";
import Home from "../pages/Home";
import RideRequest from "../pages/RideRequest";
import Location from "../pages/Location";
import BusRoute from "../pages/BusRoute";
import ProtectedRoute from "./ProtectedRoute";
import UserManagement from '../pages/UserManagement';

import { getCurrentUser } from '../store/actions/auth';
import {getLocations} from "../store/actions/locations";

const App = () => {

    const dispatch  = useDispatch();
    useEffect(()=>{

    },[])


    return (
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path={"/login"} component={Login} />
                    <Route exact path={"/register"} component={Register} />
                    <ProtectedRoute exact path={"/forgot"} component={Forgot} />
                    <ProtectedRoute exact path={"/"} component={Home} />
                    <ProtectedRoute exact path={"/ride-request"} component={RideRequest} />
                    <ProtectedRoute exact path={"/location"} component={Location} />
                    <ProtectedRoute exact path={"/route"} component={BusRoute} />
                    <ProtectedRoute exact path={"/user"} component={UserManagement} />
                </Switch>
            </BrowserRouter>
    )
}

export default App;
