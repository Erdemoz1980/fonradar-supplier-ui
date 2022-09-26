/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import LocalStorageService from '../../services/LocalStorageService';

const initialState = {
    user: '',
    isLoggedIn:
        LocalStorageService.getAuthToken() || LocalStorageService.getAuthToken() !== 'undefined'
            ? LocalStorageService.getAuthToken()
            : '',
    docTypes: '',
    createdUser: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setDocType(state, action) {
            state.docTypes = action.payload;
        },
        setLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        setCreatedUser(state, action) {
            state.createdUser = action.payload;
        },
    },
});

export const { setUser, setDocType, setLoggedIn, setCreatedUser } = userSlice.actions;
export default userSlice.reducer;
