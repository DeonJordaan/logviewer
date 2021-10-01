import React, { useState, useReducer, useEffect } from 'react';

// import LogDataWorker from './LogDataWorker';

import useFetch from './useFetch';

import { paginationReducer } from '../Components/UI/Pagination';

//TODO SUGGESTION
// const EventContext = React.createContext({
// 	dataWorkerInstance: LogDataWorker,
// });

const INITIAL_STATE = {
	key: 0,
	id: 1,
	App: '',
	taskCode: '',
	startTime: '0000-00-00T00:00:00.00',
	endTime: '0000-00-00T00:00:00.00',
	subEvents: 0,
	host: '',
	message: '',
	status: '',
};

const EventContext = React.createContext({
	tasks: [],
	subEvents: [],
	isLoading: false,
	error: null,
	isLoadingSubEvents: false,
	subEventError: null,
	totalRecordCount: [],
	pageNumber: 1,
	parentId: 1,
	selectedTask: [],
	hierarchy: [],
	getEventData: () => {},
	getSubEventData: () => {},
	setParentId: () => {},
	dispatchPageNumber: () => {},
	setHierarchy: () => {},
	setSelectedTask: () => {},
});

export const EventContextProvider = ({ children }) => {
	const [tasks, setTasks] = useState(null);
	const [subEvents, setSubEvents] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalRecordCount, setTotalRecordCount] = useState([]);
	const [isLoadingSubEvents, setIsLoadingSubEvents] = useState(false);
	const [subEventError, setSubEventError] = useState(null);
	const [parentId, setParentId] = useState(0);
	const [selectedTask, setSelectedTask] = useState([{ INITIAL_STATE }]);
	const [hierarchy, setHierarchy] = useState([{ INITIAL_STATE }]);
	const [pageNumber, dispatchPageNumber] = useReducer(paginationReducer, {
		page: 1,
	});

	//NOTE Fetch data, sort and set tasks
	const {
		data: taskData,
		isLoading: tasksLoading,
		error: taskError,
	} = useFetch(
		`http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber.page}&pageSize=10&hostname=`,
		{},
		[pageNumber]
	);
	console.log(taskData);
	setIsLoading(tasksLoading);
	setError(taskError);

	const { Data: allTaskData, TotalRecordCount: recordCount } = taskData;
	console.log(allTaskData);

	const allTasks = allTaskData.map((taskData) => {
		return {
			key: taskData.Id,
			id: taskData.Id,
			App: taskData.AppName,
			taskCode: taskData.Code,
			startTime: taskData.Started,
			endTime: taskData.Completed,
			subEvents: taskData.SubEventCount,
			host: taskData.Host,
			message: taskData.Message,
			status: taskData.Status,
		};
	});

	setTasks(allTasks);
	setTotalRecordCount(recordCount);

	//NOTE Fetch data, sort and set subEvents
	//NOTE Fetch sub-event data and extract selected event data to insert in hierarchy view
	const {
		data: subEventData,
		isLoading: subEventsLoading,
		error: subEventErrorIncoming,
	} = useFetch(
		`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`,
		{},
		[parentId]
	);
	console.log(subEventData);

	setIsLoadingSubEvents(subEventsLoading);
	setSubEventError(subEventErrorIncoming);

	const allSubEventData = subEventData.Data;
	console.log(allSubEventData);

	const subEventTasks = allSubEventData.map((taskData) => {
		return {
			key: taskData.Id,
			id: taskData.Id,
			app: taskData.AppName,
			taskCode: taskData.Code,
			startTime: taskData.Started,
			endTime: taskData.Completed,
			subEvents: taskData.SubEventCount,
			host: taskData.Host,
			message: taskData.Message,
			status: taskData.Status,
		};
	});
	setSubEvents(subEventTasks);
	setSelectedTask(tasks.filter((task) => task.id === parseInt(parentId)));

	useEffect(() => {
		setHierarchy(selectedTask);
	}, [selectedTask]);

	return (
		<EventContext.Provider
			value={{
				tasks: tasks,
				subEvents: subEvents,
				isLoading: isLoading,
				error: error,
				isLoadingSubEvents: isLoadingSubEvents,
				subEventError: subEventError,
				totalRecordCount: totalRecordCount,
				// getEventData: getEventData,
				// getSubEventData: getSubEventData,
				// setPageNumber: setPageNumber, //TODO DELETE ONCE PAGINATION WORKING
				pageNumber: pageNumber,
				dispatchPageNumber: dispatchPageNumber, //NOTE WHILE ATTEMPTING REDUCER
				parentId: parentId,
				setParentId: setParentId,
				hierarchy: hierarchy,
				setHierarchy: setHierarchy,
				selectedTask: selectedTask,
				setSelectedTask: setSelectedTask,
			}}
		>
			{children}
		</EventContext.Provider>
	);
};

export default EventContext;

///////////////////////////////////////
//REMOVING THE DATAWORKER
// const EventContext = React.createContext({
// 	tasks: LogDataWorker.tasks,
// 	subEvents: [],
// 	isLoading: false,
// 	error: null,
// 	isLoadingSubEvents: false,
// 	subEventError: null,
// 	totalRecordCount: [],
// 	pageNumber: 1,
// 	parentId: 1,
// 	selectedTask: [],
// 	hierarchy: [],
// 	getEventData: () => {},
// 	getSubEventData: () => {},
// 	setParentId: () => {},
// 	dispatchPageNumber: () => {},
// 	setHierarchy: () => {},
// 	setSelectedTask: () => {},
// });

// export const EventContextProvider = (props) => {
// 	return (
// 		<EventContext.Provider
// 			value={{
// 				tasks: LogDataWorker.tasks,
// 				subEvents: LogDataWorker.subEvents,
// 				isLoading: LogDataWorker.isLoading,
// 				error: LogDataWorker.error,
// 				isLoadingSubEvents: LogDataWorker.isLoadingSubEvents,
// 				subEventError: LogDataWorker.subEventError,
// 				totalRecordCount: LogDataWorker.totalRecordCount,
// 				getEventData: LogDataWorker.getEventData,
// 				getSubEventData: LogDataWorker.getSubEventData,
// 				// setPageNumber: setPageNumber, //TODO DELETE ONCE PAGINATION WORKING
// 				pageNumber: LogDataWorker.pageNumber,
// 				dispatchPageNumber: LogDataWorker.dispatchPageNumber, //NOTE WHILE ATTEMPTING REDUCER
// 				parentId: LogDataWorker.parentId,
// 				setParentId: LogDataWorker.setParentId,
// 				hierarchy: LogDataWorker.hierarchy,
// 				setHierarchy: LogDataWorker.setHierarchy,
// 				selectedTask: LogDataWorker.selectedTask,
// 				setSelectedTask: LogDataWorker.setSelectedTask,
// 			}}
// 		>
// 			{props.children}
// 		</EventContext.Provider>
// 	);
// };

//////////////////////////////////////
// useEffect(() => {
// 	setTasks(INITIAL_TASKS);
// 	setSelectedTask(tasks);
// 	setHierarchy(selectedTask);
// }, []);

//NOTE SETTING HIERARCHY
// const selectedTask = tasks.filter((task) => task.id === parseInt(parentId));

// console.log(selectedTask);
// const hierarchy = [];

// FIXME Trying to get setHierarchy to work via useMemo
// let selectedTask = useMemo(() => {
// 	return [];
// }, []);

// useEffect(() => {
// 	setSelectedTask(
// 		tasks?.filter((task) => task.id === parseInt(parentId))
// 	);
// }, [parentId, tasks]);
// const selectedTaskHandler = useCallback(() => {
// 	tasks.filter((task) => task.id === parseInt(parentId));
// 	// 	console.log(parentId);
// }, [tasks, parentId]);

// useEffect(() => {
// 	setHierarchy(() => {
// 		return {selectedTask}}), [selectedTask]);
