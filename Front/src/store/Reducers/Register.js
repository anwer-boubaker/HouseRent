import * as actionTypes from '../Actions/ActionTypes';
import { updateObject } from '../Utility';

const initialState = {
    token: null,
    user: null,
    error: null,
    loading: false
};

const registerStart = ( state, action ) => {
    console.log(action);
    return updateObject( state, { error: null, loading: true } );
};

const registerSuccess = (state, action) => {
    console.log(action);
    return updateObject( state, { 
        token: action.token,
        user: action.user,
        error: null,
        loading: false
     } );
     
};

const registerFail = (state, action) => {
    console.log(action.error);
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.REGISTER_START: return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        default:
            return state;
    }
};

export default reducer;