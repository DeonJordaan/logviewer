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
		SET_SELECTED_EVENT(state, action: PayloadAction<number | []>) {
			const { events } = state;
			const item = events.filter((event) => event.Id === action.payload);
			state.selectedEvent = item;
		},
		EVENT_RESET(state) {
			state.selectedEvent = [];
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
					Key: data.Id,
					Id: data.Id,
					AppName: data.AppName,
					EventName: data.EventName,
					StartTime: data.StartTime,
					EndTime: data.EndTime,
					EventCount: data.EventCount,
					Host: data.Host,
					Message: data.Message,
					StatusId: data.StatusId,
					ParentEventId: data.ParentEventId,
				};
			});
			console.log(taskData);
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
