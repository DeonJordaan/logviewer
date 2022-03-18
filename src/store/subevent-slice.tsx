import {
	ActionCreatorWithNonInferrablePayload,
	ActionCreatorWithoutPayload,
	createSlice,
} from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import DataInterface from '../types/dataInterface';
import Event from '../types/event';
// import eventSlice from './event-slice';
import db from './firebase';

type subEventState = {
	subEvents: Event[];
	selectedTask: Event[];
	selectedSubEvent: Event[];
	hierarchy: Event[];
	parentId: number;
	fetchId: number;
	subEventParentId: number;
};

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
		SET_SUB_EVENTS(state = initialSubEventState, action) {
			state.subEvents = action.payload.subEvents;
		},
		SET_PARENT_ID(state = initialSubEventState, action) {
			state.parentId = action.payload.id;
		},
		SET_FETCH_ID(state = initialSubEventState, action) {
			state.fetchId = action.payload.id;
		},
		// SET_SELECTED_TASK(state = initialSubEventState, action) {
		// 	state.selectedTask = state.tasks.filter(
		// 		(task) => task.id === parentId
		// 	);
		},
	},
});

export const setSelectedTask = (id:number) => {
	return (_dispatch: any, getState: () => any) => {
		const state = getState();
		state.selectedTask = state.tasks.filter(
			(task: Event) => task.id === id
		);
	};
};

export const fetchSubEventData = (fetchId: number) => {
	return async (
		dispatch: (
			arg0:
				| ActionCreatorWithNonInferrablePayload<string>
				| ActionCreatorWithoutPayload<string>
		) => { (arg0: { subEvents: Event[] }): void; new (): any }
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
