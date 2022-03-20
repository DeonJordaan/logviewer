// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import eventSlice from './event-slice';
import paginationSlice from './pagination-slice';
import subEventSlice from './subevent-slice';

const store = configureStore({
	reducer: {
		events: eventSlice.reducer,
		subEvents: subEventSlice.reducer,
		pagination: paginationSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
