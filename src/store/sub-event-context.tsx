import React, {
	useState,
	useEffect,
	useContext,
	Dispatch,
	SetStateAction,
} from 'react';

// import { paginationReducer } from '../Components/UI/Pagination';

import EventContext from './event-context';
import useFetch from './useFetch';
import SubEvent from '../Interfaces/subEvent';
import DataInterface from '../Interfaces/dataInterface';

type SubEventContextObject = {
	subEvents: SubEvent[];
	isLoading: boolean;
	error: string | null;
	parentId: number | undefined;
	subEventParentId: number | undefined;
	selectedTask: SubEvent[] | undefined;
	selectedSubEvent: SubEvent[];
	hierarchy: SubEvent[] | undefined;
	setParentId: Dispatch<SetStateAction<undefined>>;
	setSubEventParentId: Dispatch<SetStateAction<undefined>>;
	setHierarchy: Dispatch<SetStateAction<SubEvent[] | undefined>>;
	setSelectedTask: Dispatch<SetStateAction<SubEvent[] | undefined>>;
	setSelectedSubEvent: Dispatch<SetStateAction<SubEvent[]>>;
};

const SubEventContext = React.createContext<SubEventContextObject>({
	subEvents: [],
	isLoading: false,
	error: null,
	parentId: 0,
	subEventParentId: 0,
	selectedTask: [],
	selectedSubEvent: [],
	hierarchy: [],
	setParentId: () => {},
	setSubEventParentId: () => {},
	setHierarchy: () => {},
	setSelectedTask: () => {},
	setSelectedSubEvent: () => {},
});

export const SubEventContextProvider: React.FC = (props) => {
	const [subEvents, setSubEvents] = useState<SubEvent[]>([]);
	const [parentId, setParentId] = useState(undefined);
	const [subEventParentId, setSubEventParentId] = useState(undefined);
	const [selectedTask, setSelectedTask] = useState<SubEvent[] | undefined>();
	const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent[]>([]);
	const [hierarchy, setHierarchy] = useState<SubEvent[] | undefined>();

	// FIXME ATTEMPTING TO ADD THE CURRENTLY SELECTED TASK TO THE HIERARCHY ARRAY IN ORDER TO SUPPLY THE NESTED TASKS AS THEY'RE SELECTED
	// useEffect(() => {
	// 	setHierarchy(selectedTask);
	// }, [selectedTask]);
	useEffect(() => {
		setHierarchy((prevState) => {
			return [...prevState, ...selectedSubEvent];
		});
	}, [selectedSubEvent]);

	//COMMENT Fetch data, sort and set subEvents
	const { isLoading, error, sendRequest: fetchTasks } = useFetch();

	const eventCtx = useContext(EventContext);

	useEffect(() => {
		const transformData = (taskData: {
			TotalRecordCount: number;
			Data: DataInterface[];
			PageNumber: number;
		}) => {
			const { Data: allTaskData } = taskData;

			const allTasks = allTaskData.map((data) => new SubEvent(data));

			setSubEvents(allTasks);
		};

		fetchTasks(
			{
				url: `http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`,
			},
			transformData
		);
	}, [eventCtx.tasks, fetchTasks, parentId]);

	// useEffect(() => {
	// 	setHierarchy(selectedTask);
	// }, [selectedTask]);

	return (
		<SubEventContext.Provider
			value={{
				subEvents: subEvents,
				isLoading: isLoading,
				error: error,
				parentId: parentId,
				setParentId: setParentId,
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

///////////////////////////
//NOTE OLD GETSUBEVENT FUNCTION
//COMMENT Fetch data, sort and set subEvents
//NOTE Fetch sub-event data and extract selected event data to insert in hierarchy view
// const {
// 	data: subEventData,
// 	isLoading: subEventsLoading,
// 	error: subEventErrorIncoming,
// } = useFetch(
// 	`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`,
// 	{},
// 	[parentId]
// );
// console.log(subEventData);

// setIsLoadingSubEvents(subEventsLoading);
// setSubEventError(subEventErrorIncoming);

// const allSubEventData = subEventData.Data;
// console.log(allSubEventData);

// const subEventTasks = allSubEventData.map((taskData) => {
// 	return {
// 		key: taskData.Id,
// 		id: taskData.Id,
// 		app: taskData.AppName,
// 		taskCode: taskData.Code,
// 		startTime: taskData.Started,
// 		endTime: taskData.Completed,
// 		subEvents: taskData.SubEventCount,
// 		host: taskData.Host,
// 		message: taskData.Message,
// 		status: taskData.Status,
// 	};
// });
// setSubEvents(subEventTasks);
// setSelectedTask(tasks.filter((task) => task.id === parseInt(parentId)));
