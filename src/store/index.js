import { combineReducers, configureStore, createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import commonReducer from './reducers/commonSlice';

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
    ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
});

const rootReducer = combineReducers({
    user: userReducer,
    common: commonReducer,
});

const store = configureStore({
    reducer: rootReducer,
    // Note that this will replace all default middleware
    middleware: [immutableInvariantMiddleware],
});

export default store;
