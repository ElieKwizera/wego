import React, {useEffect, useState} from 'react';
import {Route,Redirect} from 'react-router-dom';
const ProtectedRoute = ({component:Component,...rest}) => {

    const [authenticated,setAuthenticated ] = useState(undefined);

    useEffect(()=>{
        const profile = JSON.parse(localStorage.getItem('profile'));
        if (profile)
        {
            if (profile.token)
                setAuthenticated(true)
            else
                setAuthenticated(false)
        }
        else
            setAuthenticated(false)

    },[])
    return (
        <Route
            {...rest}
            render={props => {
                if (authenticated === true)
                {
                    return <Component {...props} />;
                }
                else if (authenticated === false)
                {
                    return ( <Redirect to={{pathname: "/login"}}/> );
                }
            }}
        />
    );
    };

export default ProtectedRoute;