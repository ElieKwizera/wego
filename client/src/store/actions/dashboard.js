import axios from "axios";
import {API_URL} from "../../constants/constants";

const getStatistics = () => async (dispatch) =>
{
    try
    {
        const token  = JSON.parse(localStorage.getItem('profile')).token;
        const config = {
            headers: { Authorization: `Bearer ${token}`},
        };
        const res = await  axios.get(`${API_URL}/api/stats`, config);
        console.log(res.data)
        dispatch({type:'FETCH_STATS', payload: res.data.data})
    }
    catch (err)
    {
        console.log(err);
    }
}

export {getStatistics};