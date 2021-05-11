import React, {useEffect,useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getUsers,updateUser } from '../store/actions/auth';


const UserManagement = () => {

    const users = useSelector(state => state.auth.users);
    const [selectedUser,setSelectedUser] = useState();
    const [role,setRole] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(updateUser(selectedUser._id,role));
        setSuccessMessage(true);
    }


    useEffect(()=>{
        dispatch(getUsers());
    },[dispatch])
    return (
        <div>

            <div className="container mx-auto p-10">
                <div className="flex mx-auto space-x-5">
                    <div className="w-2/6">
                        <div className="self-center mb-6 text-xl font-normal text-primary "> System Users </div>
                        <div className="flex flex-col w-full max-w-lg px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10 mt-5">
                            <ul class="divide-y divide-gray-200">
                                {users && users.map( user => (
                                <li key={user._id} className={"py-3"}> 
                                    <a href="#" className="block hover:bg-gray-100" onClick={()=>{setSelectedUser(user)}} >
                                        <div className="pb-4">
                                            <div className="flex items-center justify-between">
                                                <p className="text-md text-gray-700 md:truncate"> {user.username} </p>
                                                <div class="ml-2 flex-shrink-0 flex">
                                                    <p className="px-5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-400 text-white"> {user.role} </p>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <div className="">
                                                    <p className="flex items-center text-md font-light text-gray-800">{user.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>

                    <div className="w-2/6 float-right">
                        
                        {selectedUser && (
                            <>
                        <div className="self-center mb-6 text-xl font-normal text-primary "> User Details </div>
                           

                                <div className="flex flex-col w-full max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 mt-5">
                                   <div className="mt-2">
       
                                       <form action="#" autoComplete="off" onSubmit={handleSubmit}>
                                          {successMessage && <p className="text-teal-500" style={{ color: '#008080'}}> User information updated successfully</p> }  
                                           <div className="flex flex-col">
                                               <div className=" relative ">
                                                   <label for="email" className="text-gray-700"> Email </label>
                                                   <input value={selectedUser.email} type="email" disabled name={"email"} placeholder="Email" className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-300 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent" disabled/>
                                               </div>
                                           </div>
       
                                           <div className="flex flex-col mt-5">
                                               <div className=" relative ">
                                                   <label for="username" className="text-gray-700"> Username
                                               <span className="text-red-500 required-dot"> *</span>
                                                   </label>
                                                   <input value={selectedUser.username}type="text" name={"username"} placeholder="Username" className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-300 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent" disabled/>
                                               </div>
                                           </div>
       
                                           <div className="mt-5">
                                               <label className="text-gray-700 mt-10" for="role">
                                                   Role
                                       <span className="text-red-500 required-dot"> *</span>
                                                   <select name={"role"} value={selectedUser.role} onChange={(e)=>{ setRole(e.target.value)}} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" >
                                                       <option value="driver"> Driver </option>
                                                       <option value="passenger"> Passenger </option>
                                                       <option value="admin"> Admin </option>
                                                   </select>
                                               </label>
                                           </div>
       
                                           <div className="flex w-full mt-10">
                                               <button type="submit" className="py-2 px-4 bg-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-1 focus:ring-offset-2 rounded-lg ">
                                                   Save
                                       </button>
                                           </div>
                                       </form>
                                   </div>
                               </div>
                               </>
                        )}
                     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagement;