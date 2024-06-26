import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (doctorUsername) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`/schedule/${doctorUsername}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
});

export const addReception = createAsyncThunk('schedule/addReception', async (newReception, { dispatch }) => {
    const response = await axios.post('/schedule', newReception);
    return response.data;
});

export const markReception = createAsyncThunk('schedule/markReception', async ({ id, newStatus }, { dispatch }) => {
    console.log(id, newStatus);
    const response = await axios.put(`/schedule/${id}`, {newStatus});
    return response.data;
});

const setCurrentDate = (date) => ({
    type: 'SET_CURRENT_DATE',
    payload: date.toISOString(),
});

const initialState = {
    currentDate: setCurrentDate(new Date()).payload,
    loading: false,
    currentDoctorUsername: null,
    schedule: [],
    error: ''
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setCurrentDoctorUsername: (state, action) => {
            state.currentDoctorUsername = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedule.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.schedule = action.payload;
            })
            .addCase(fetchSchedule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addReception.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(addReception.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addReception.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(markReception.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(markReception.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(markReception.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});


export const { setCurrentDoctorUsername } = scheduleSlice.actions;
export default scheduleSlice.reducer;
