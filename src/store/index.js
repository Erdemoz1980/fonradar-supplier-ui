import { combineReducers, configureStore, createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import commonReducer from './reducers/commonSlice';
import supplierFinanceReducer from './reducers/supplierFinanceSlice';
import fundReducer from './reducers/fundSlice';

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
    ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
});

const rootReducer = combineReducers({
    user: userReducer,
    common: commonReducer,
    supplierFinance: supplierFinanceReducer,
    fund: fundReducer,
});

const store = configureStore({
    reducer: rootReducer,
    // Note that this will replace all default middleware
    middleware: [immutableInvariantMiddleware],
});

export default store;
