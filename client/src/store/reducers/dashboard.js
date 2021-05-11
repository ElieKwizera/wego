const dashboardReducers =  ( state = { stats : {}}, action) =>
{
    switch (action.type)
    {
        case 'FETCH_STATS':
            return { stats: action.payload}
        default:
            return state
    }
}

export default dashboardReducers;