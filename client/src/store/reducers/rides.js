const ridesReducers = (rides = [], action) =>
{
    switch (action.type)
    {
        case 'FETCH_REQUESTS':
            return action.payload;
        case 'SEND_REQUEST':
            return [...rides, action.payload];
        default:
            return rides;
    }
}

export default ridesReducers;