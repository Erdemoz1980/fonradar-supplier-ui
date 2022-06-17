import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import watchSagas from './sagaListeners';

import userReducer from './user/userReducer';
import provinceReducer from './provinces/provinceReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    user: userReducer,
    provinces: provinceReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware
    .run(watchSagas)
    .toPromise()
    .catch((error) => {
        console.log(error);
    });

export default store;
