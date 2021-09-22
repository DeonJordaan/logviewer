import React, { useEffect, useState, useCallback, useReducer } from 'react';

import { paginationReducer } from '../Components/UI/Pagination';

const INITIAL_HIERARCHY = [
	{
		App: 'none',
		endTime: 'none',
		host: 'none',
		id: 0,
		key: 0,
		message: 'none',
		startTime: 'none',
		status: 0,
		subEvents: 'none',
		taskCode: 0,
	},
];

const EventContext = React.createContext({
	tasks: [],
	subEvents: [],
	isLoading: false,
	error: null,
	isLoadingSubEvents: false,
	subEventError: null,
	totalRecordCount: [],
	pageNumber: 1,
	parentId: [],
	selectedTask: [],
	hierarchy: [],
	getEventData: () => {},
	getSubEventData: () => {},
	setParentId: () => {},
	dispatchPageNumber: () => {},
	setHierarchy: () => {},
	setSelectedTask: () => {},
});

export const EventContextProvider = (props) => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalRecordCount, setTotalRecordCount] = useState([]);
	const [subEvents, setSubEvents] = useState([]);
	const [isLoadingSubEvents, setIsLoadingSubEvents] = useState(false);
	const [subEventError, setSubEventError] = useState(null);
	const [parentId, setParentId] = useState([]);
	const [selectedTask, setSelectedTask] = useState([]);
	const [hierarchy, setHierarchy] = useState([...INITIAL_HIERARCHY]);
	const [pageNumber, dispatchPageNumber] = useReducer(paginationReducer, {
		page: 1,
	});

	// useEffect(() => {
	// 	setHierarchy(EventContext.selectedTask);
	// 	console.log(selectedTask);
	// }, [parentId, selectedTask]);

	//NOTE Fetch data, sort and set tasks
	const getEventData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber.page}&pageSize=10&hostname=`
				// `http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=2&pageSize=10&hostname=`
			);

			if (!response.ok) {
				throw new Error('Could not retrieve data');
			}

			const data = await response.json();

			const { Data: allData, TotalRecordCount: recordCount } = data;

			const allTasks = allData.map((taskData) => {
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
		} catch (error) {
			console.log('Error');
			setError(error.message);
		}
		setIsLoading(false);
	}, [pageNumber]);

	// useEffect(() => {
	// 	getEventData();
	// }, []);

	//NOTE Fetch sub-event data and extract selected event data to insert in hierarchy view
	const getSubEventData = useCallback(async () => {
		setIsLoadingSubEvents(true);
		setSubEventError(null);
		try {
			const response = await fetch(
				// `http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=15001`
				`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`
			);

			if (!response.ok) {
				throw new Error('Could not retrieve data');
			}

			const data = await response.json();
			const allData = data.Data;

			const subEventTasks = allData.map((taskData) => {
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
			// console.log(parentId);
			// setHierarchy(parentId);
			// console.log(hierarchy);
		} catch (error) {
			console.log('Error');
			setSubEventError(error.message);
		}
	}, [parentId]);

	// useEffect(() => {
	// 	getSubEventData();
	// }, [getSubEventData, parentId]);

	//NOTE SETTING HIERARCHY
	// FIXME Trying to get setHierarchy to work via useMemo
	// let selectedTask = useMemo(() => {
	// 	return [];
	// }, []);

	useEffect(() => {
		setSelectedTask(tasks.filter((task) => task.id === parseInt(parentId)));
	}, [parentId, tasks]);
	// const selectedTaskHandler = useCallback(() => {
	// 	tasks.filter((task) => task.id === parseInt(parentId));
	// 	// 	console.log(parentId);
	// }, [tasks, parentId]);

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
				getEventData: getEventData,
				getSubEventData: getSubEventData,
				// setPageNumber: setPageNumber, //TODO DELETE ONCE PAGINATION WORKING
				pageNumber: pageNumber.page,
				dispatchPageNumber: dispatchPageNumber, //NOTE WHILE ATTEMPTING REDUCER
				parentId: parentId,
				setParentId: setParentId,
				hierarchy: hierarchy,
				setHierarchy: setHierarchy,
				selectedTask: selectedTask,
				setSelectedTask: setSelectedTask,
			}}
		>
			{props.children}
		</EventContext.Provider>
	);
};

export default EventContext;
