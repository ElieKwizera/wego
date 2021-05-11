import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { registerLocation} from '../store/actions/locations';
import {Link} from "react-router-dom";

import {getLocations} from '../store/actions/locations';


const Location = () => {
    const locations  = useSelector(state => state.locations);
    const user  = useSelector(state => state.auth.authData.data);
    const [locationName,setLocationName] = useState('');

    const dispatch = useDispatch();

    const createLocation = (e)=>
    {
        e.preventDefault();
        dispatch(registerLocation(locationName));
        setLocationName("");
    }
    
    useEffect(()=>{
        dispatch(getLocations());
    },[])


    return (
        <div>
            <div className="container flex flex-wrap mx-auto">
               { user.role === 'admin' && <div className="w-1/2">
                    <div className="p-10">
                        <div className="self-center mb-6 text-xl font-normal text-primary">
                            Add A New Location
                        </div>

                        <div className="flex flex-col w-full max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 mt-5">

                            <div className="mt-2">
                                <form action="#" autoComplete="off" onSubmit={createLocation}>
                                    <div className="flex flex-col mb-2">
                                        <div className=" relative ">
                                            <label htmlFor="name" className="text-gray-700"> Name
                                                <span className="text-red-500 required-dot"> *</span>
                                            </label>
                                            <input
                                                value={locationName}
                                                onChange={event => setLocationName(event.target.value)}
                                                type="text"
                                                name={"name"}
                                                placeholder="Location name"
                                                className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-300 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent" />
                                        </div>
                                    </div>

                                    <div className="flex w-full mt-10">
                                        <button type="submit" className="py-2 px-4 bg-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-1 focus:ring-offset-2 rounded-lg ">
                                            Add
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>} 
               
                <div className="w-1/2">
                    <div className="p-10">
                        <div className="self-center mb-6 text-xl font-normal text-primary ">
                            Registered locations
                        </div>

                        <div className="flex flex-col w-full max-w-lg px-4 py-4 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10 mt-5">
                            <ul className="divide-y divide-gray-200">
                                {locations && locations.map(location => (
                                    <li key={location._id}>
                                        <Link to={"#"} className="block hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <div className="pb-2 mt-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-md text-gray-700 md:truncate"> {location.name} </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Location;