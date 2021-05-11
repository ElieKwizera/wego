import React from 'react'
import moment from "moment";
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';

const MyRides = () => {
    const rides = useSelector(state => state.rides)
    return (
        <div className={"container mx-auto flex justify-center"}>

            <div className="p-10">
                <div className="self-center mb-6 text-xl font-normal text-primary">
                    My Ride Requests
                </div>

                <div className="w-full max-w-lg px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10 mt-5">
                    <ul className="divide-y divide-gray-200">
                        {rides && rides.map( ride => (
                        <li>
                            <Link to={"#"} className="block hover:bg-gray-50 dark:hover:bg-gray-900">
                                <div className="pb-4 mt-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-md text-gray-700 md:truncate"> {ride.departure} &#10141; {ride.destination} </p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <p className="px-5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"> {ride.status} </p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="">
                                            <p className="flex items-center text-md font-light text-gray-800">Price: &nbsp; <b className="text-primary">499 Rwf</b></p>

                                            <p className="flex items-center mt-1 text-md font-light text-gray-500 dark:text-gray-300"> {moment(ride.pickUpTime).format('MMMM Do, h:mm a')} </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyRides;