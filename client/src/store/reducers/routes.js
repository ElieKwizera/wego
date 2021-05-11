const routesReducers = (routes = [], action) =>
{
    switch (action.type)
    {
        case 'FETCH_ROUTES':
            return action.payload;
        case 'SEND_ROUTE':
            return [...routes, action.payload];
        default:
            return routes;
    }
}

export default routesReducers;