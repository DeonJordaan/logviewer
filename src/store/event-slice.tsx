import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
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
		SET_EVENTS(state, action: PayloadAction<Event[]>) {
			state.events = action.payload;
		},
		// FIXME SEE RELATING TO RERENDER IN NOTES
		SET_SELECTED_EVENT(state, action: PayloadAction<number>) {
			const { events } = state;
			const item = events.filter((event) => event.id === action.payload);
			state.selectedEvent = item;
		},
	},
});

export const fetchEventData = () => {
	return async (
		dispatch: (arg0: { payload: Event[]; type: string }) => void
	) => {
		const getEvents = async () => {
			// setIsLoading(true);
			let taskData: Event[] = [];

			const eventsRef = collection(db, 'events');

			const querySnapshot = await getDocs(eventsRef);

			querySnapshot.forEach((doc) => taskData.push(doc.get('event')));

			const allTasks = taskData.map((data) => {
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
			console.log(allTasks);

			return allTasks;
			// setIsLoading(false);
		};

		try {
			const eventsData = await getEvents();
			dispatch(eventSlice.actions.SET_EVENTS(eventsData));
			console.log(eventsData);
		} catch (error) {
			// TODO Complete error handling
			console.log(error);
		}
	};
};

export default eventSlice;

export const eventActions = eventSlice.actions;
