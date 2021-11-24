import React, { useState, useReducer, useEffect } from 'react';

import { paginationReducer } from '../Components/UI/Pagination';
import useFetch from './useFetch';
import Task from '../Interfaces/task';
import DataInterface from '../Interfaces/dataInterface';

type EventContextObject = {
	tasks: Task[];
	isLoading: boolean;
	error: string | null;
	totalRecordCount: number | null;
	pageNumber: number;
	dispatchPageNumber: () => void;
};

const EventContext = React.createContext<EventContextObject>({
	tasks: [],
	isLoading: false,
	error: null,
	totalRecordCount: null,
	pageNumber: 1,
	dispatchPageNumber: () => {},
});

export const EventContextProvider: React.FC = (props) => {
	const [tasks, setTasks] = useState<Task[]>([]);

	const [totalRecordCount, setTotalRecordCount] = useState<number | null>(
		null
	);

	const [pageNumber, dispatchPageNumber] = useReducer(paginationReducer, {
		page: 1,
	});

	//COMMENT Fetch data, sort and set tasks
	const { isLoading, error, sendRequest: fetchTasks } = useFetch();

	useEffect(() => {
		const transformData = (taskData: {
			TotalRecordCount: number;
			Data: DataInterface[];
			PageNumber: number;
		}) => {
			const { Data: allTaskData, TotalRecordCount: recordCount } =
				taskData;

			const allTasks = allTaskData.map((data) => new Task(data));

			setTasks(allTasks);
			setTotalRecordCount(recordCount);
		};

		// NOTE appName options for URL below
		// SalesActivityReport
		// MetroIQ
		// AgentIQ
		// PropIQ
		// SACompany
		fetchTasks(
			{
				url: `http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber.page}&pageSize=10&hostname=`,
			},
			transformData
		);
	}, [fetchTasks, pageNumber.page]);

	const contextValue: EventContextObject = {
		tasks: tasks,
		isLoading: isLoading,
		error: error,
		totalRecordCount: totalRecordCount,
		pageNumber: pageNumber.page,
		dispatchPageNumber: dispatchPageNumber,
	};

	return (
		<EventContext.Provider value={contextValue}>
			{props.children}
		</EventContext.Provider>
	);
};

export default EventContext;

///////////////////////////////////////

// NOTE SETTING HIERARCHY VIEW TO THE CURRENTLY SELECTED TASK
// useEffect(() => {
// 	setHierarchy(selectedTask);
// }, [selectedTask]);

// FIXME ATTEMPTING TO ADD THE CURRENTLY SELECTED TASK TO THE HIERARCHY ARRAY IN ORDER TO SUPPLY THE NESTED TASKS AS THEY'RE SELECTED
// useEffect(() => {
// 	setHierarchy((prevState) => {
// 		return [...prevState, ...selectedTask];
// 	});
// }, [selectedTask]);

//setTheArray(prevArray => [...prevArray, newValue])

// GETSUBEVENTDATA FUNCTION
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

//FROM EVENTCONTEXT.PROVIDER...NOTE THE . (DOT)
// parentId: parentId,
// setParentId: setParentId,
// hierarchy: hierarchy,
// setHierarchy: setHierarchy,
// selectedTask: selectedTask,
// setSelectedTask: setSelectedTask,

///////////////////////////////////////
//TODO SUGGESTION
// const EventContext = React.createContext({
// 	dataWorkerInstance: LogDataWorker,
// });

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