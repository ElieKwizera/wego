import axios from "axios";
import {API_URL} from "../../constants/constants";

const getLocations = () => async (dispatch)=>{
    try
    {
        const {data} = await axios.get(`${API_URL}/api/request/location`);
        dispatch({type:'FETCH_ALL',payload:data.data});
    }
    catch (e) {
        console.log(e.message);
    }
}

const registerLocation = (location) => async (dispatch) =>{
    try
    {
        const {data}  =  await axios.post(`${API_URL}/api/request/location`, {name:location});
        console.log(data);
        dispatch({type:'CREATE', payload: data.data});
    }
    catch (err)
    {
        console.log(err);
    }
}

export {getLocations, registerLocation};