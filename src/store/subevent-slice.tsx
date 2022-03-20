import {
	ActionCreatorWithPayload,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import DataInterface from '../types/dataInterface';
import Event from '../types/event';
// import eventSlice from './event-slice';
import db from './firebase';

interface subEventState {
	subEvents: Event[];
	selectedTask: Event[];
	selectedSubEvent: Event[];
	hierarchy: Event[];
	parentId: number;
	fetchId: number;
	subEventParentId: number;
}

const initialSubEventState: subEventState = {
	subEvents: [],
	selectedTask: [],
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
		SET_SUB_EVENTS(
			state = initialSubEventState,
			action: PayloadAction<Event[]>
		) {
			state.subEvents = action.payload;
		},
		SET_PARENT_ID(
			state = initialSubEventState,
			action: PayloadAction<number>
		) {
			state.parentId = action.payload;
		},
		SET_FETCH_ID(
			state = initialSubEventState,
			action: PayloadAction<number>
		) {
			state.fetchId = action.payload;
		},
		SET_SUB_EVENT_PARENT_ID(
			state = initialSubEventState,
			action: PayloadAction<number>
		) {
			state.subEventParentId = action.payload;
		},
		// SET_SELECTED_TASK(state = initialSubEventState, action) {
		// 	state.selectedTask = state.tasks.filter(
		// 		(task) => task.id === parentId
		// 	);
		// },
		// 	SET_SELECTED_SUB_EVENT(state, action){
		// 		subEvents.filter((subEvent) => subEvent.id === subEventParentId)
		// 	};,
	},
});

export const setHierarchy = () => {
	return (_dispatch: any, getState: () => any) => {
		const state = getState();
		state.hierarchy = state.hierarchy.push(state.selectedSubEvent);
	};
};

export const setSelectedSubEvent = () => {
	return (_dispatch: any, getState: () => any) => {
		const state = getState();
		state.selectedSubEvent = state.subEvents.filter(
			(subEvent: Event) => subEvent.id === state.subEventParentId
		);
	};
};

export const setSelectedTask = (id: number) => {
	return (_dispatch: any, getState: () => any) => {
		const state = getState();
		state.selectedTask = state.tasks.filter(
			(task: Event) => task.id === id
		);
	};
};

export const fetchSubEventData = (fetchId: number) => {
	return async (
		dispatch: (arg0: ActionCreatorWithPayload<Event[]>) => {
			(arg0: { subEvents: Event[] }): void;
			new (): any;
		}
	) => {
		const getSubEvents = async () => {
			let subEventData: DataInterface[] = [];
			const subEventsRef = collection(db, 'subEvents');
			const subEventQuery = query(
				subEventsRef,
				where('event.parentId', '==', fetchId)
			);

			const querySnapshot = await getDocs(subEventQuery);

			querySnapshot.forEach((doc) => subEventData.push(doc.get('event')));
			const allSubEvents = subEventData.map((data) => new Event(data));

			return allSubEvents;
		};

		try {
			const subEventsData = await getSubEvents();
			dispatch(subEventSlice.actions.SET_SUB_EVENTS)({
				subEvents: subEventsData,
			});
			console.log(subEventSlice);
		} catch (error) {
			// TODO COmplete error handling
			console.log(error);
		}
	};
};

export const subEventActions = subEventSlice.actions;

export default subEventSlice;
