const authReducers = ( state = {authData: null, users:[]},action) =>
{
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('userProfile', {...action.payload})
            return {...state, authData: action?.payload}
        case 'FETCH_USERS':
            return {...state,users: action.payload}
        case 'UPDATE_USER':
            return {...state,users:action.payload} 
        default:
            return state;
    }

}

export default authReducers;