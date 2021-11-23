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
	parentId: number | null;
	selectedTask: SubEvent[]; //NOTE CHANGE THIS TO selectedSubEvent
	hierarchy: SubEvent[];
	setParentId: Dispatch<SetStateAction<null>>;
	setHierarchy: Dispatch<SetStateAction<SubEvent[]>>;
	setSelectedTask: Dispatch<SetStateAction<SubEvent[]>>;
};

const SubEventContext = React.createContext<SubEventContextObject>({
	subEvents: [],
	isLoading: false,
	error: null,
	parentId: 1,
	selectedTask: [],
	hierarchy: [],
	setParentId: () => {},
	setHierarchy: () => {},
	setSelectedTask: () => {},
});

export const SubEventContextProvider: React.FC = (props) => {
	const [subEvents, setSubEvents] = useState<SubEvent[]>([]);
	const [parentId, setParentId] = useState(null);
	const [selectedTask, setSelectedTask] = useState<SubEvent[]>([]);
	const [hierarchy, setHierarchy] = useState<SubEvent[]>([]);

	// FIXME ATTEMPTING TO ADD THE CURRENTLY SELECTED TASK TO THE HIERARCHY ARRAY IN ORDER TO SUPPLY THE NESTED TASKS AS THEY'RE SELECTED
	// useEffect(() => {
	// 	setHierarchy(selectedTask);
	// }, [selectedTask]);
	useEffect(() => {
		setHierarchy(selectedTask);
		// setHierarchy((prevState) => {
		// 	return [...prevState, selectedTask];
		// });
	}, [selectedTask]);

	//COMMENT Fetch data, sort and set tasks
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
				hierarchy: hierarchy,
				setHierarchy: setHierarchy,
				selectedTask: selectedTask,
				setSelectedTask: setSelectedTask,
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
