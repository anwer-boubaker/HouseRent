import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/Reducers/Auth';
import registerReducer from './store/Reducers/Register'
import housesReducer from './store/Reducers/Houses';
import reservationReducer from './store/Reducers/Reservation';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    register :registerReducer,
    Houses :housesReducer,
    reservation :reservationReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
