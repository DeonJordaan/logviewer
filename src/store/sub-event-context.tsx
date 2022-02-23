import React, {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useContext,
} from 'react';

import useFetch from './useFetch';
import EventContext from './event-context';
import DataInterface from '../types/dataInterface';
import Event from '../types/event';
import db from './firebase';
import { addDoc, collection } from 'firebase/firestore';
// import { ref, set } from 'firebase/database';

type SubEventContextObject = {
	error: string | null;
	isLoading: boolean;
	selectedTask: Event[];
	subEvents: Event[];
	selectedSubEvent: Event[];
	hierarchy: Event[];
	parentId: number;
	fetchId: number;
	subEventParentId: number;
	setParentId: Dispatch<SetStateAction<number>>;
	setFetchId: Dispatch<SetStateAction<number>>;
	setSubEventParentId: Dispatch<SetStateAction<number>>;
	setHierarchy: Dispatch<SetStateAction<Event[]>>;
	setSelectedTask: Dispatch<SetStateAction<Event[]>>;
	setSelectedSubEvent: Dispatch<SetStateAction<Event[]>>;
};

const SubEventContext = React.createContext<SubEventContextObject>({
	error: null,
	isLoading: false,
	selectedTask: [],
	subEvents: [],
	selectedSubEvent: [],
	hierarchy: [],
	parentId: 0,
	fetchId: 0,
	subEventParentId: 0,
	setParentId: () => [],
	setFetchId: () => [],
	setSubEventParentId: () => [],
	setHierarchy: () => [],
	setSelectedTask: () => [],
	setSelectedSubEvent: () => [],
});

export const SubEventContextProvider: React.FC = (props) => {
	const [subEvents, setSubEvents] = useState<Event[]>([]);

	const [parentId, setParentId] = useState(0);

	const [fetchId, setFetchId] = useState(0);

	const [subEventParentId, setSubEventParentId] = useState(0);

	const [selectedTask, setSelectedTask] = useState<Event[]>([]);

	const [selectedSubEvent, setSelectedSubEvent] = useState<Event[]>([]);

	const [hierarchy, setHierarchy] = useState<Event[]>([]);

	//FETCH DATA, SORT & SET SUBEVENTS
	const { isLoading, error, sendRequest: fetchTasks } = useFetch();

	useEffect(() => {
		const transformData = (taskData: {
			TotalRecordCount: number;
			Data: DataInterface[];
			PageNumber: number;
		}) => {
			const { Data: allTaskData } = taskData;
			console.log(allTaskData);
			// TODO PUSH ALL DATA TO FIREBASE HERE
			// NOTE SET PARENTID IN ORDER THAT SUBEVENT DATA GETS PUSHED TO PARENT EVET UNDER SUBEVENTS

			// const allTasks = allTaskData.map((data) => new Event(data));
			const allTasks = allTaskData.map((taskData) => {
				return {
					key: taskData.Id,
					id: taskData.Id,
					App: 'Application Name',
					taskCode: 'Event Code',
					startTime: taskData.Started,
					endTime: taskData.Completed,
					subEvents: taskData.SubEventCount,
					host: 'Application Host',
					message: 'Event Message',
					status: taskData.Status,
					parentId: taskData.ParentId,
				};
			});

			setSubEvents(allTasks);
		};

		fetchTasks(
			{
				url: `http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${fetchId}`,
			},
			transformData
		);
	}, [fetchTasks, fetchId]);

	// WATCH PAGENUMBER AND CLEAR STATES WHEN IT CHANGES
	const eventCtx = useContext(EventContext);
	const pageNumber = eventCtx.pageNumber;

	useEffect(() => {
		setSubEvents([]);
		setParentId(0);
		setSubEventParentId(0);
		setSelectedTask([]);
		setSelectedSubEvent([]);
		setHierarchy([]);
	}, [pageNumber]);

	useEffect(() => {
		setSubEventParentId(0);
		setSelectedSubEvent([]);
		setHierarchy([]);
	}, [selectedTask]);

	const subEventStore = collection(db, 'sub-events');

	useEffect(() => {
		subEvents.forEach((event) => {
			addDoc(subEventStore, { event });
		});
	}, [subEvents]);

	// useEffect(() => {
	// 	subEvents.forEach((event) => {
	// 		set(ref(db, 'subEvents/' + event.id), {
	// 			event,
	// 		});
	// 	});
	// }, [subEvents]);

	return (
		<SubEventContext.Provider
			value={{
				subEvents: subEvents,
				isLoading: isLoading,
				error: error,
				parentId: parentId,
				fetchId: fetchId,
				setParentId: setParentId,
				setFetchId: setFetchId,
				subEventParentId: subEventParentId,
				setSubEventParentId: setSubEventParentId,
				hierarchy: hierarchy,
				setHierarchy: setHierarchy,
				selectedTask: selectedTask,
				setSelectedTask: setSelectedTask,
				selectedSubEvent: selectedSubEvent,
				setSelectedSubEvent: setSelectedSubEvent,
			}}
		>
			{props.children}
		</SubEventContext.Provider>
	);
};

export default SubEventContext;

// NOTE DIFFERENT METHODS FOR SETTING HIERARCHY
// STANDARD STATE UPDATING FUNCTION
// useEffect(() => {
// 	setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
// }, [selectedSubEvent]);

// CHECKING PREVSTATE
// useEffect(() => {
// 	setHierarchy((prevState) =>
// 		prevState ? [...prevState, ...selectedSubEvent] : selectedSubEvent
// 	);
// }, [selectedSubEvent]);

// TYPECASTING PREVSTATE
// useEffect(() => {
// 	setHierarchy((prevState) => [
// 		...(prevState as Event[]),
// 		selectedSubEvent,
// 	]);
// }, [selectedSubEvent]);

// SINGLE SELECTED SUBEVENT
// useEffect(() => {
// 	setHierarchy(selectedSubEvent);
// }, [selectedSubEvent]);
