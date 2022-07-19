/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import LocalStorageService from '../../services/LocalStorageService';

const initialState = {
    isLoggedIn: LocalStorageService.getAuthToken(),
    docTypes: '',
    createdUser: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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

export const { setDocType, setLoggedIn, setCreatedUser } = userSlice.actions;
export default userSlice.reducer;
