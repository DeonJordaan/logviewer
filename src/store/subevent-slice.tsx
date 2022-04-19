import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Event from '../types/event';
import db from './firebase';

interface subEventState {
	subEvents: Event[];
	selectedSubEvent: Event[];
	hierarchy: Event[];
	parentId: number;
	fetchId: number;
	subEventParentId: number;
}

const initialState: subEventState = {
	subEvents: [],
	selectedSubEvent: [],
	hierarchy: [],
	parentId: 0,
	fetchId: 0,
	subEventParentId: 0,
};

const subEventSlice = createSlice({
	name: 'subEvents',
	initialState,
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
		SET_SELECTED_SUB_EVENT(state, action: PayloadAction<number | []>) {
			const { subEvents } = state;
			const item = subEvents.filter(
				(subEvent) => subEvent.Id === action.payload
			);
			state.selectedSubEvent = item;
		},
		SET_HIERARCHY(state) {
			state.hierarchy.push(...state.selectedSubEvent);
		},
		LEVELUP_HIERARCHY(state, action: PayloadAction<number>) {
			const clickedEvent = state.hierarchy.filter(
				(event) => event.Id === action.payload
			);
			const eventIndex = state.hierarchy.indexOf(clickedEvent[0]);

			state.hierarchy.splice(eventIndex);

			if (state.hierarchy.length > 0) {
				const newFetchId = state.hierarchy.at(-1)!.Id;
				state.fetchId = newFetchId;
			} else if (state.hierarchy.length <= 0) {
				state.fetchId = state.parentId;
			}

			// NOTE Removing only the last event in hierarchy
			// state.hierarchy.splice(-1);
		},
		RESET_HIERARCHY(state) {
			state.hierarchy = [];
		},
		// FIXME THIS THING DOESN'T WORK, BUT I REALLY SHOULD GET IT TO
		SUB_EVENT_RESET() {
			Object.assign(initialState);
			// return initialState;
		},
	},
});

export const fetchSubEventData = (fetchId: number) => {
	return async (
		dispatch: (arg0: { payload: Event[]; type: string }) => void
	) => {
		const getSubEvents = async (fetchId: number) => {
			let subEventData: Event[] = [];

			const subEventsRef = collection(db, 'subEvents');

			const subEventQuery = query(
				subEventsRef,
				where('event.ParentEventId', '==', fetchId)
			);

			const querySnapshot = await getDocs(subEventQuery);

			querySnapshot.forEach((doc) => subEventData.push(doc.get('event')));

			const allSubEvents = subEventData.map((data) => {
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

			return allSubEvents;
		};

		try {
			const subEventsData = await getSubEvents(fetchId);
			dispatch(subEventSlice.actions.SET_SUB_EVENTS(subEventsData));
		} catch (error) {
			// TODO Complete error handling
			console.log(error);
		}
	};
};

export const subEventActions = subEventSlice.actions;

export default subEventSlice;
