import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	createSlice,
	// PayloadAction,
} from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { AnyAction } from 'redux';
import DataInterface from '../types/dataInterface';
import Event from '../types/event';
import db from './firebase';

type EventsState = {
	events: Event[];
	selectedEvent: Event[];
	displayData: Event[];
};
const initialEventState: EventsState = {
	events: [],
	selectedEvent: [],
	displayData: [],
};

export const eventSlice = createSlice({
	name: 'events',
	initialState: initialEventState,
	reducers: {
		SET_EVENTS(state = initialEventState, action: AnyAction) {
			state.events = action.payload.events;
		},
	},
});

export const fetchEventData = () => {
	return async (
		dispatch: (
			arg0:
				| ActionCreatorWithPayload<any, string>
				| ActionCreatorWithoutPayload<string>
		) => { (arg0: { events: Event[] }): void; new (): any }
	) => {
		const getEvents = async () => {
			// setIsLoading(true);
			let taskData: DataInterface[] = [];

			const eventsRef = collection(db, 'events');

			const querySnapshot = await getDocs(eventsRef);

			querySnapshot.forEach((doc) => taskData.push(doc.get('event')));

			const allTasks = taskData.map((data) => new Event(data));

			return allTasks;
			// setIsLoading(false);
		};

		try {
			const eventsData = await getEvents();
			dispatch(eventSlice.actions.SET_EVENTS)({
				events: eventsData,
			});
			console.log(eventSlice);
		} catch (error) {
			console.log(error);
		}
	};
};

export const eventActions = eventSlice.actions;
