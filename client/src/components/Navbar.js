import React, { useEffect, useState } from 'react';
import logo from '../assets/wegoLogo.png';
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import {getCurrentUser} from "../store/actions/auth";
import {getLocations} from "../store/actions/locations";

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showMainMenu, setShowMainMenu] = useState(false);
    const user  = useSelector(state => state.auth.authData);

    let history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();


    const toggleMainMenu = () => {
        const temp = !showMainMenu;
        setShowMainMenu(temp);
    }

    const showProfileMenu = () => {
        const temp = !showMenu;
        setShowMenu(temp);
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        history.push("/login");
    }

    useEffect(()=>
    {
        if(location.pathname !== '/register' && location.pathname !== '/login')
        {
            dispatch(getCurrentUser(history));
            dispatch(getLocations());
        }
    })

    if (location.pathname !== '/register' && location.pathname !== '/login') {


        return (
            <div>
                <nav className="bg-primary sticky fixed">
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                                <button type="button"
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-controls="mobile-menu" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>

                                    <svg onClick={toggleMainMenu} className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>

                                    <svg onClick={toggleMainMenu} className="hidden h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div
                                className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start mt-0">
                                <div className="flex-shrink-0 flex items-center mt-0">
                                    <img className="block lg:hidden h-8 w-auto" src={logo} alt="" />
                                    <img className="hidden lg:block" src={logo} alt="" width="120" height="120" />
                                </div>

                                <div className="hidden sm:block sm:ml-6">

                                    <div className="flex space-x-4 sm:mt-11 md:mt-11">
                                        { user && user.data.role === 'admin' && <Link to={"/"}
                                            className="text-white  hover:text-white hover:font-semibold px-3 py-2 rounded-md text-sm font-medium"
                                            aria-current="page">Dashboard</Link> }

                                        <Link to="/ride-request"
                                            className="text-white  hover:text-white hover:font-semibold px-3 py-2 rounded-md text-sm font-medium">Ride
                                            Requests</Link>

                                        <Link to="/route"
                                            className="text-white   px-3 py-2 rounded-md text-sm font-medium">Routes</Link>

                                        <Link to="/location" className="text-white   px-3 py-2 rounded-md text-sm font-medium">Locations</Link>

                                       { user && user.data.role === 'admin' && <Link to="/user" className="text-white   px-3 py-2 rounded-md text-sm font-medium">User Management</Link> }
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                    <div className="ml-3 relative">

                                        <div className={"flex"}>
                                            <button onClick={showProfileMenu} type="button"
                                                className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                                id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt="" />
                                            </button>
                                        </div>

                                        {showMenu && (
                                            <div
                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
                                                tabIndex={-1}>
                                                <Link to="/" className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem" tabIndex={-1} id="user-menu-item-0">Your
                                                Profile</Link>
                                                <Link to="/" className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</Link>
                                                <Link onClick={logout} className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</Link>
                                            </div>
                                        )}


                                    </div>
                                </div>
                            </div>
                        </div>

                        {showMainMenu && (
                            <div className="sm:hidden" id="mobile-menu">
                                <div className="px-2 pt-2 pb-3 space-y-1">
                                   {user && user.data.role === 'admin' &&  <Link to="/"
                                        className="text-white text-white block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current="page">Dashboard</Link>
                                    }

                                    <Link to="/ride-request"
                                        className="text-white  hover:text-white block px-3 py-2 rounded-md text-base font-medium">Ride
                                    Requests</Link>

                                    <Link to="/"
                                        className="text-white  hover:text-white block px-3 py-2 rounded-md text-base font-medium">Drivers</Link>

                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        )
    }
    else {
        return (<></>)
    }
}

export default NavBar;