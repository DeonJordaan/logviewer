import React, {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useContext,
} from 'react';

import useFetch from './useFetch';

import Event from '../types/event';

import DataInterface from '../types/dataInterface';

import EventContext from './event-context';

type SubEventContextObject = {
	error: string | null;
	isLoading: boolean;
	selectedTask: Event[];
	subEvents: Event[];
	selectedSubEvent: Event[];
	hierarchy: Event[];
	// hierarchyHeader: Event[];
	parentId: number;
	fetchId: number;
	subEventParentId: number;
	setParentId: Dispatch<SetStateAction<number>>;
	setFetchId: Dispatch<SetStateAction<number>>;
	setSubEventParentId: Dispatch<SetStateAction<number>>;
	setHierarchy: Dispatch<SetStateAction<Event[]>>;
	// setHierarchyHeader: Dispatch<SetStateAction<Event[]>>;
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
	// hierarchyHeader: [],
	parentId: 0,
	fetchId: 0,
	subEventParentId: 0,
	setParentId: () => [],
	setFetchId: () => [],
	setSubEventParentId: () => [],
	setHierarchy: () => [],
	// setHierarchyHeader: () => [],
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

	// const [hierarchyHeader, setHierarchyHeader] = useState<Event[]>([]);

	//FETCH DATA, SORT & SET SUBEVENTS
	const { isLoading, error, sendRequest: fetchTasks } = useFetch();

	useEffect(() => {
		const transformData = (taskData: {
			TotalRecordCount: number;
			Data: DataInterface[];
			PageNumber: number;
		}) => {
			const { Data: allTaskData } = taskData;

			const allTasks = allTaskData.map((data) => new Event(data));

			setSubEvents(allTasks);
		};

		fetchTasks(
			{
				url: `http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${fetchId}`,
			},
			transformData
		);
	}, [fetchTasks, fetchId]);

	// SETTING SELECTED EVENT TO HIERARCHY
	useEffect(() => {
		setHierarchy(selectedSubEvent);
		// setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
	}, [selectedSubEvent]);

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
		// setHierarchyHeader([]);
	}, [pageNumber]);

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
				// hierarchyHeader: hierarchyHeader,
				setHierarchy: setHierarchy,
				// setHierarchyHeader: setHierarchyHeader,
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
