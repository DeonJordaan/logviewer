import { configureStore } from '@reduxjs/toolkit';
import eventSlice from './event-slice';
import paginationSlice from './pagination-slice';
import subEventSlice from './subevent-slice';
import appSlice from './application-slice';
import hostSlice from './host-slice';

const store = configureStore({
	reducer: {
		events: eventSlice.reducer,
		subEvents: subEventSlice.reducer,
		applications: appSlice.reducer,
		hosts: hostSlice.reducer,
		pagination: paginationSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
