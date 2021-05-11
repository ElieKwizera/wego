import axios from "axios";
import {API_URL} from "../../constants/constants";
import store from '../store';

const register = (authData)=> async (dispatch)=>{
    try
    {
        const {data} = await axios.post(`${API_URL}/api/auth/register`,{username:authData.username, email:authData.email,password:authData.password});
        dispatch({type:'AUTH', payload:data});
        localStorage.setItem('profile',JSON.stringify(data));
        if(data.data.role === 'admin')
            {
                authData.history.push('/');
            }
            else
            {
                authData.history.push('/ride-request');
            }
    }
    catch (err)
    {
        console.log(err);
    }
}

const login = (authData)=> async (dispatch)=>
    {
        try
        {
            const {data} = await axios.post(`${API_URL}/api/auth/login`,{email:authData.email,password:authData.password});
            dispatch({type:'AUTH', payload:data});
            localStorage.setItem('profile',JSON.stringify(data));
            if(data.data.role === 'admin')
            {
                authData.history.push('/');
            }
            else
            {
                authData.history.push('/ride-request');
            }
            
        }
        catch (err)
        {
            console.log(err);
        }
    }

const googleSignIn = (authData)=> async (dispatch)=>
{
    try
    {
        const {data} = await axios.post(`${API_URL}/api/auth/google`,{email:authData.email,username:authData.username});
        dispatch({type:'AUTH', payload:data});
        localStorage.setItem('profile',JSON.stringify(data));
        if(data.data.role === 'admin')
        {
            authData.history.push('/');
        }
        else
        {
            authData.history.push('/ride-request');
        }
    }
    catch (err)
    {
        console.log(err);
    }
}

const getCurrentUser = (history)=> async (dispatch)=> {
        const profile = JSON.parse(localStorage.getItem('profile'));
        if(!profile)
        {
            history.push('/login')
        }
}

const getUsers = ()=> async (dispatch)=> {
    
    try 
    {
        const {data} = await axios.get(`${API_URL}/api/auth/getusers`);
        dispatch({type:'FETCH_USERS', payload:data.data});
    } 
    catch (error) 
    {
        console.log(error);    
    }
}

const updateUser = (id, role)=> async (dispatch) => {
    try
    {
        const token  = JSON.parse(localStorage.getItem('profile')).token;
        const config = {
            headers: { Authorization: `Bearer ${token}`},
        };
        const {data} = await axios.post(`${API_URL}/api/auth/updateuser`, {id,role}, config);
        dispatch({type:'UPDATE_USER', payload: data.data});
    }
    catch (error)
    {
        console.log(error);
    }
}

export {login,register, googleSignIn,getCurrentUser,updateUser, getUsers};