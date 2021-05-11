import axios from "axios";
import {API_URL} from "../../constants/constants";

const registerRoute = (routeData) => async (dispatch) =>
{
    try
    {
        const token  = JSON.parse(localStorage.getItem('profile')).token;
        const config = {
            headers: { Authorization: `Bearer ${token}`},
        };
        const res = await  axios.post(`${API_URL}/api/busroute`, routeData, config);
        dispatch({type:'SEND_ROUTE', payload: res.data.data});
    }
    catch (err)
    {
        console.log(err);
    }
}

const getRoutes = () => async (dispatch) =>
{
    try
    {
        const token  = JSON.parse(localStorage.getItem('profile')).token;
        const config = {
            headers: { Authorization: `Bearer ${token}`},
        };
        const res = await  axios.get(`${API_URL}/api/busroute`, config);
        dispatch({type:'FETCH_ROUTES', payload: res.data.data});
    }
    catch (err)
    {
        console.log(err);
    }
}


export {registerRoute, getRoutes};