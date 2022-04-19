import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	collection,
	DocumentData,
	getDocs,
	Query,
	query,
	where,
} from 'firebase/firestore';
import Event from '../types/event';
import db from './firebase';

interface EventsState {
	events: Event[];
	selectedEvent: Event[];
	displayData: Event[];
	totalRecordCount: number;
	date: number;
	eventsByDate: Event[];
}

const initialEventState: EventsState = {
	events: [],
	selectedEvent: [],
	displayData: [],
	totalRecordCount: 0,
	date: Date.now(),
	eventsByDate: [],
};

const eventSlice = createSlice({
	name: 'events',
	initialState: initialEventState,
	reducers: {
		SET_EVENTS(state, action: PayloadAction<Event[]>) {
			state.events = action.payload;
		},
		SET_SELECTED_EVENT(state, action: PayloadAction<number | []>) {
			const { events } = state;
			const item = events.filter((event) => event.Id === action.payload);
			state.selectedEvent = item;
		},
		EVENT_RESET(state) {
			state.selectedEvent = [];
		},
		SET_TOTAL_RECORD_COUNT(state, action) {
			state.totalRecordCount = action.payload;
		},
		SET_DATE(state, action) {
			state.date = action.payload;
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

			return allTasks;
			// setIsLoading(false);
		};

		try {
			const eventsData = await getEvents();
			dispatch(eventSlice.actions.SET_EVENTS(eventsData));
			const eventsDataLength = eventsData.length;
			dispatch(
				eventSlice.actions.SET_TOTAL_RECORD_COUNT(eventsDataLength)
			);
		} catch (error) {
			// TODO Complete error handling
			console.log(error);
		}
	};
};

export const fetchSelectAppData = (selectedApp: string) => {
	return async (
		dispatch: (arg0: { payload: Event[]; type: string }) => void
	) => {
		const getEvents = async () => {
			// setIsLoading(true);
			const app: string = selectedApp;

			let taskData: Event[] = [];

			const selectAppRef = collection(db, 'events');

			let selectQuery: Query<DocumentData>;

			if (selectedApp === 'All') {
				selectQuery = selectAppRef;
			} else {
				selectQuery = query(
					selectAppRef,
					where('event.AppName', '==', app)
				);
			}

			const querySnapshot = await getDocs(selectQuery);

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

			return allTasks;
			// setIsLoading(false);
		};

		try {
			const appData = await getEvents();
			dispatch(eventSlice.actions.SET_EVENTS(appData));
			const appDataLength = appData.length;
			dispatch(eventSlice.actions.SET_TOTAL_RECORD_COUNT(appDataLength));
		} catch (error) {
			// TODO Complete error handling
			console.log(error);
		}
	};
};

export const fetchSelectHostData = (selectedHost: string) => {
	return async (
		dispatch: (arg0: { payload: Event[]; type: string }) => void
	) => {
		const getEvents = async () => {
			// setIsLoading(true);
			const host: string = selectedHost;

			let taskData: Event[] = [];

			const selectHostRef = collection(db, 'events');

			let selectQuery: Query<DocumentData>;

			if (selectedHost === 'All') {
				selectQuery = selectHostRef;
			} else {
				selectQuery = query(
					selectHostRef,
					where('event.Host', '==', host)
				);
			}

			const querySnapshot = await getDocs(selectQuery);

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

			return allTasks;
			// setIsLoading(false);
		};

		try {
			const hostData = await getEvents();
			dispatch(eventSlice.actions.SET_EVENTS(hostData));
			const hostDataLength = hostData.length;
			dispatch(eventSlice.actions.SET_TOTAL_RECORD_COUNT(hostDataLength));
		} catch (error) {
			// TODO Complete error handling
			console.log(error);
		}
	};
};

export default eventSlice;

export const eventActions = eventSlice.actions;
