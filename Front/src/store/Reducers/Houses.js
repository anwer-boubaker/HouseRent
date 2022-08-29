import * as actionTypes from '../Actions/ActionTypes';
import { updateObject } from '../Utility';

const initialState = {
    houses:null,
    error: null,
    loading: false
};

const fetchHousesStart = ( state, action ) => {
    return updateObject( state, {houses:null, loading: true } );
};

const fetchHousesSuccess = (state, action) => {
    return updateObject( state, { 
        houses: action.houses,
        error: null,
        loading: false
     } );
     
};

const fetchHousesFail = (state, action) => {
    return updateObject( state, {
        houses: null,
        error: action.error,
        loading: false
    });
}


const filterHousesStart = ( state, action ) => {
    return updateObject( state, { houses:null,loading: true } );
};

const filterHousesSuccess = (state, action) => {
    return updateObject( state, { 
        houses: action.houses,
        error: null,
        loading: false
     } );
     
};

const filterHousesFail = (state, action) => {
    return updateObject( state, {
        houses:null,
        error: action.error,
        loading: false
    });
}




const getHouseStart = ( state, action ) => {
    return updateObject( state, { houses:null,loading: true } );
};

const getHouseSuccess = (state, action) => {
    return updateObject( state, { 
        houses: action.houses,
        error: null,
        loading: false
     } );
     
};

const getHouseFail = (state, action) => {
    return updateObject( state, {
        houses: null,
        error: action.error,
        loading: false
    });
}

const getMyHousesStart = ( state, action ) => {
    return updateObject( state, { houses:null,loading: true } );
};

const getMyHousesSuccess = (state, action) => {
    return updateObject( state, { 
        houses: action.houses,
        error: null,
        loading: false
     } );
     
};

const getMyHousesFail = (state, action) => {
    return updateObject( state, {
        houses: null,
        error: action.error,
        loading: false
    });
}

const deleteMyHouseStart = (state, action) => {
    return updateObject( state, action);
}

const updateMyHouseStart = (state, action) => {
    return updateObject( state, action);
}



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_HOUSES_START: return fetchHousesStart(state, action);
        case actionTypes.FETCH_HOUSES_SUCCESS: return fetchHousesSuccess(state, action);
        case actionTypes.FETCH_HOUSES_FAIL: return fetchHousesFail(state, action);
        case actionTypes.FILTER_HOUSES_START: return filterHousesStart(state, action);
        case actionTypes.FILTER_HOUSES_SUCCESS: return filterHousesSuccess(state, action);
        case actionTypes.FILTER_HOUSES_FAIL: return filterHousesFail(state, action);
        case actionTypes.GET_HOUSE_START: return getHouseStart(state, action);
        case actionTypes.GET_HOUSE_SUCCESS: return  getHouseSuccess(state, action);
        case actionTypes.GET_HOUSE_FAIL: return getHouseFail(state, action);
        case actionTypes.GET_MY_HOUSES_START: return getMyHousesStart(state, action);
        case actionTypes.GET_MY_HOUSES_SUCCESS: return  getMyHousesSuccess(state, action);
        case actionTypes.GET_MY_HOUSES_FAIL: return getMyHousesFail(state, action);
        case actionTypes.DELETE_MY_HOUSE: return deleteMyHouseStart(state, action);
        case actionTypes.UPDATE_MY_HOUSE: return updateMyHouseStart(state, action);
        default:
            return state;
    }
};

export default reducer;