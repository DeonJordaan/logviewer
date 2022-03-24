import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Event from '../types/event';
import db from './firebase';

interface subEventState {
	subEvents: Event[];
	// selectedTask: Event[];
	selectedSubEvent: Event[];
	hierarchy: Event[];
	parentId: number;
	fetchId: number;
	subEventParentId: number;
}

const initialSubEventState: subEventState = {
	subEvents: [],
	// selectedTask: [],
	selectedSubEvent: [],
	hierarchy: [],
	parentId: 0,
	fetchId: 0,
	subEventParentId: 0,
};

const subEventSlice = createSlice({
	name: 'subEvents',
	initialState: initialSubEventState,
	reducers: {
		SET_SUB_EVENTS(state, action: PayloadAction<Event[]>) {
			state.subEvents = action.payload;
		},
		SET_PARENT_ID(state, action: PayloadAction<number>) {
			state.parentId = action.payload;
		},
		SET_FETCH_ID(state, action: PayloadAction<number>) {
			state.fetchId = action.payload;
		},
		SET_SUB_EVENT_PARENT_ID(state, action: PayloadAction<number>) {
			state.subEventParentId = action.payload;
		},
		// SET_SELECTED_TASK(state = initialSubEventState, action) {
		// 	state.selectedTask = state.tasks.filter(
		// 		(task) => task.id === parentId
		// 	);
		// },
		// FIXME THIS IS CAUSING INFINITE LOOP/RERENDER
		SET_SELECTED_SUB_EVENT(state, action: PayloadAction<number>) {
			const { subEvents } = state;
			const item = subEvents.filter(
				(subEvent) => subEvent.id === action.payload
			);
			state.selectedSubEvent = item;
		},

		// FIXME ERRORS
		SET_HIERARCHY(state) {
			// NOTE This throws type error I cannot resolve
			state.hierarchy.push(...state.selectedSubEvent);
			// NOTE Trying something else
			// return [state.hierarchy, ...state.selectedSubEvent]; // As per something spotted in the docs, haven't tested this
			// const oldHierarchy = state.hierarchy;
			// const newHierarchy = [...oldHierarchy, ...state.selectedSubEvent];
			// state.hierarchy = newHierarchy;
		},
	},
});

// export const setHierarchy = () => {
// 	return (_dispatch: any, getState: () => any) => {
// 		const state = getState();

// 		state.hierarchy.push(state.selectedSubEvent);
// 	};
// };

// export const setSelectedSubEvent = () => {
// 	return (_dispatch: any, getState: () => subEventState) => {
// 		const state = getState() as subEventState;
// 		const selected: Event[] = state.subEvents.filter(
// 			(subEvent: Event) => subEvent.id === state.subEventParentId
// 		);
// 		state.selectedSubEvent = selected;
// 	};
// };

// export const setSelectedTask = (selectedEvent: Event[]) => {
// 	return (_dispatch: any, getState: () => any) => {
// 		const state = getState();
// 		state.selectedTask = events.filter(
// 			(task: Event) => task.id === state.parentId
// 		);
// 	};
// };

export const fetchSubEventData = (fetchId: number) => {
	return async (
		dispatch: (arg0: { payload: Event[]; type: string }) => void
	) => {
		const getSubEvents = async (fetchId: number) => {
			let subEventData: Event[] = [];

			const subEventsRef = collection(db, 'subEvents');

			const subEventQuery = query(
				subEventsRef,
				where('event.parentId', '==', fetchId)
			);

			console.log(fetchId);
			const querySnapshot = await getDocs(subEventQuery);

			querySnapshot.forEach((doc) => subEventData.push(doc.get('event')));

			const allSubEvents = subEventData.map((data) => {
				return {
					key: data.key,
					id: data.id,
					App: data.App,
					taskCode: data.taskCode,
					startTime: data.startTime,
					endTime: data.endTime,
					subEvents: data.subEvents,
					host: data.host,
					message: data.message,
					status: data.status,
					parentId: data.parentId,
				};
			});
			console.log(allSubEvents);

			return allSubEvents;
		};

		try {
			const subEventsData = await getSubEvents(fetchId);
			dispatch(subEventSlice.actions.SET_SUB_EVENTS(subEventsData));
			console.log(subEventsData);
		} catch (error) {
			// TODO Complete error handling
			console.log(error);
		}
	};
};

export const subEventActions = subEventSlice.actions;

export default subEventSlice;
