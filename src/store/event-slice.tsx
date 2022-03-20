import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	createSlice,
	PayloadAction,
	// PayloadAction,
} from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import DataInterface from '../types/dataInterface';
import Event from '../types/event';
import db from './firebase';

interface EventsState {
	events: Event[];
	selectedEvent: Event[];
	displayData: Event[];
}

const initialEventState: EventsState = {
	events: [],
	selectedEvent: [],
	displayData: [],
};

const eventSlice = createSlice({
	name: 'events',
	initialState: initialEventState,
	reducers: {
		SET_EVENTS(state = initialEventState, action: PayloadAction<Event[]>) {
			state.events = action.payload;
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
			console.log(allTasks);

			return allTasks;
			// setIsLoading(false);
		};

		try {
			const eventsData = await getEvents();
			dispatch(
				eventSlice.actions.SET_EVENTS({
					events: eventsData,
				})
			);
		} catch (error) {
			// TODO Complete error handling
			console.log(error);
		}
	};
};

export default eventSlice;

// TODO DO I NEED THESE EXPORTS FOR MY APPLICATION?
export const eventActions = eventSlice.actions;
