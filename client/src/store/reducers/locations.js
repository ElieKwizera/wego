const locationReducers =  (locations = [], action)=>
    {
        switch (action.type){
            case 'FETCH_ALL':
                return action.payload;
            case 'CREATE':
                return [...locations, action.payload];
            default:
                return locations;
        }

    }

    export default locationReducers;