import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {registerRoute} from "../store/actions/routes";
import {getRoutes} from "../store/actions/routes";



const BusRoute = () => {

    const locations  = useSelector(state => state.locations);
    const routes = useSelector(state => state.routes);
    const [start,setStart] = useState();
    const [end,setEnd] = useState();
    const [price,setPrice] = useState();
    const user  = useSelector(state => state.auth.authData.data);

    const dispatch = useDispatch();

    const handleSubmit = (event)=>
    {
        event.preventDefault();
        dispatch(registerRoute({start,end,price}));
        event.target.reset();
    }

    useEffect(() =>{
        dispatch(getRoutes());
    },[dispatch])

    return (
        <div>
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                { user.role === 'admin' && 
                
                <div className="w-1/2">
                    <div className="p-10">

                        <div className="self-center mb-6 text-xl font-normal text-primary ">
                            Add A New Bus Route
                        </div>
                        

                        <div className="flex flex-col w-full max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 mt-5">

                            <div className="mt-2">
                                <form action="#" autoComplete="off" onSubmit={handleSubmit}>

                                    <div className="mt-2">
                                        <label className="text-gray-700 mt-10" htmlFor="start">
                                            Start
                                            <span className="text-red-500 required-dot"> *</span>
                                            <select
                                                onChange={event => { setStart(event.target.value)}}
                                                name={"start"}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" >
                                                <option value="" disabled selected> Select starting location </option>
                                                {locations && locations.map( location => (<option  key={location._id} value={location.name}> {location.name} </option>)) }
                                            </select>
                                        </label>
                                    </div>

                                    <div className="mt-5">
                                        <label className="text-gray-700 mt-10" htmlFor="end">
                                            End
                                            <span className="text-red-500 required-dot"> *</span>
                                            <select
                                                onChange={event => { setEnd(event.target.value)}}
                                                name={"end"}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" >
                                                <option value="" disabled selected> Select end location </option>
                                                {locations && locations.map( location => (<option  key={location._id} value={location.name}> {location.name} </option>)) }
                                            </select>
                                        </label>
                                    </div>

                                    <div className="flex flex-col mb-2 mt-5">
                                        <div className=" relative ">
                                            <label htmlFor="price" className="text-gray-700"> Price
                                                <span className="text-red-500 required-dot"> *</span>
                                            </label>
                                            <input
                                                onChange={event => setPrice(event.target.value)}
                                                type="text"
                                                name={"price"}
                                                placeholder="Price"
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
                </div>
                }
                
                <div className="w-1/2">
                    <div className="p-10">
                        <div className="self-center mb-6 text-xl font-normal text-primary ">
                            Registered routes
                        </div>

                        <div className="flex flex-col w-full max-w-lg px-4 py-4 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10 mt-5">
                            <ul className="divide-y divide-gray-200">
                                {routes && routes.map(route => (
                                    <li key={route._id}>
                                        <Link to={"#"} className="block hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <div className="pb-2 mt-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-md text-gray-700 md:truncate"> {route.start} &#10141; {route.end} </p>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="">
                                                        <p className="flex items-center text-md font-light text-gray-800">Price: &nbsp; <b className="text-primary">{route.price} Rwf </b></p>
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

                </div>
            </div>

        </div>
    )
}

export default BusRoute;