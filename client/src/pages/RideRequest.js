import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {requestRide} from '../store/actions/rides';
import {useHistory} from 'react-router-dom';
import RequestList from "../components/RequestList";
import {getRideRequests} from '../store/actions/rides';



const RideRequest = () => {
    const locations = useSelector(state => state.locations);
    const user  = useSelector(state => state.auth.authData.data);

    const [destination,setDestination] = useState();
    const [departure,setDeparture] = useState();
    const [pickUpTime,setPickupTime] = useState();
    const [passengers,setPassengers] = useState();

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e)=>{

        e.preventDefault();
        dispatch(requestRide({departure,destination,pickUpTime,passengers,history}));
    }
    const depChange = (e)=>
    {
        setDeparture(e.target.value)
    }
    const destChange = (e)=>
    {
        setDestination(e.target.value);
    }
    useEffect(()=>{
        dispatch(getRideRequests());
    },[dispatch])


    return (
        <div className={"container flex flex-wrap mx-auto"}>
            {user.role === 'passenger' && 
            <div className="w-1/2">
                <div className="p-10">
                    <div className="self-center mb-6 text-xl font-normal text-primary">
                        Request a ride
                    </div>

                    <div className="flex flex-wrap flex-col w-full max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 mt-5">

                        <div className="mt-2">
                            <form action="#" autoComplete="on" onSubmit={handleSubmit}>
                                <div className="mt-5">
                                    <label className="text-gray-700 mt-10" htmlFor="departure">
                                        Departure
                                        <span className="text-red-500 required-dot"> *</span>
                                        <select
                                            onChange={(e)=>{depChange(e)}}
                                            name={"departure"}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" >

                                            <option value={departure} > Select departure location </option>
                                            {locations && locations.map(location =>(
                                                <option value={location.name} key={location._id}> {location.name} </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                <div className="mt-5">
                                    <label className="text-gray-700 mt-10" htmlFor="destination">
                                        Destination
                                        <span className="text-red-500 required-dot"> *</span>
                                        <select
                                            onChange={(e)=>destChange(e)}
                                            name={"destination"}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" >
                                            <option value={destination}> Select destination location </option>
                                            {locations && locations.map(location =>(
                                                <option value={location.name} key={location._id}> {location.name} </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                <div className="mt-5">
                                    <label className="text-gray-700" htmlFor="time">
                                        Pickup time
                                        <input value={pickUpTime} onChange={event => setPickupTime(event.target.value)} type="datetime-local" className="mt-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent flex-1" />
                                    </label>
                                </div>

                                <div className="flex flex-col mt-5">
                                    <div className=" relative ">
                                        <label htmlFor="passengers" className="text-gray-700"> Passengers
                                            <span className="text-red-500 required-dot"> *</span>
                                        </label>
                                        <input
                                            value={passengers}
                                            onChange={event => setPassengers(event.target.value)}
                                            type="number"
                                            name={"passengers"}
                                            placeholder="Number of Passengers"
                                            className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-300 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent" />
                                    </div>
                                </div>

                                <div className="flex w-full mt-10">
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-1 focus:ring-offset-2 rounded-lg ">
                                        Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> }
            <div className="w-1/2">
                <RequestList/>
            </div>



        </div>
    )
}

export default RideRequest;