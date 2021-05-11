    import axios from "axios";
import {API_URL} from "../../constants/constants";

const requestRide = (requestData) => async (dispatch) =>
{
    try
    {
        const token  = JSON.parse(localStorage.getItem('profile')).token;
        const config = {
            headers: { Authorization: `Bearer ${token}`},
        };
        const res = await  axios.post(`${API_URL}/api/request`, requestData, config);
        dispatch({type:'SEND_REQUEST', payload: res.data.data})

    }
    catch (err)
    {
        console.log(err);
    }
}

const getRideRequests = () => async (dispatch) =>
{
    try
    {
        const token  = JSON.parse(localStorage.getItem('profile')).token;
        const config = {
            headers: { Authorization: `Bearer ${token}`},
        };
        const res = await  axios.get(`${API_URL}/api/request`, config);
        dispatch({type:'FETCH_REQUESTS', payload: res.data.data})
    }
    catch (err)
    {
        console.log(err);
    }
}




export {requestRide, getRideRequests};