// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

// type StateObject = {
// 	tasks: Event[];
// 	// isLoading: boolean;
// 	// error: string | null;
// 	totalRecordCount: number;
// 	totalPageCount: number;
// 	pageNumber: number;
// 	displayData: Event[];
// 	selectedTask: Event[];
// 	subEvents: Event[];
// 	selectedSubEvent: Event[];
// 	hierarchy: Event[];
// 	parentId: number;
// 	fetchId: number;
// 	subEventParentId: number;
// };

const initialState: StateObject = {
	// isLoading: false,
	// error: null,
	totalRecordCount: 0,
	totalPageCount: 0,
	pageNumber: 1,

	subEvents: [],
	selectedSubEvent: [],
	hierarchy: [],
	parentId: 0,
	fetchId: 0,
	subEventParentId: 0,
};

// const store = createStore(taskReducer);
const store = configureStore({
	reducer: {
		events: eventSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

// const taskReducer = (state = initialState, action: { type: any }) => {
// 	switch (action.type) {
// 		case 'SET_SELECTED_TASKS':
// 			return { ...state };
// 	}
// };
