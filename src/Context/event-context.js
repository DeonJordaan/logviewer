import React, { useEffect, useState, useCallback, useReducer } from 'react';

import { paginationReducer } from '../Components/UI/Pagination';

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
	hierarchy: [],
	getEventData: () => {},
	getSubEventData: () => {},
	// setPageNumber: () => {}, //TODO DELETE ONCE PAGINATION WORKING
	setParentId: () => {},
	dispatchPageNumber: () => {},
	setHierarchy: () => {},
});

export const EventContextProvider = (props) => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalRecordCount, setTotalRecordCount] = useState([]);
	const [subEvents, setSubEvents] = useState([]);
	const [isLoadingSubEvents, setIsLoadingSubEvents] = useState(false);
	const [subEventError, setSubEventError] = useState(null);
	const [parentId, setParentId] = useState();
	const [hierarchy, setHierarchy] = useState([]);

	// const [pageNumber, setPageNumber] = useState(1); //TODO DELETE ONCE PAGINATION WORKING

	const [pageNumber, dispatchPageNumber] = useReducer(paginationReducer, {
		page: 1,
	});

	//SETTING HIERARCHY
	// FIXME Trying to get setHierarchy to work via useMemo
	// let selectedTask = useMemo(() => {
	// 	return [];
	// }, []);

	// const [hierarchy, setHierarchy] = useState({});

	// const selectedTask = tasks.filter((task) => task.id === parseInt(parentId));
	// useEffect(() => setHierarchy(selectedTask), [selectedTask]);

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

	//NOTE Fetch sub-event data and extract selected event data to insert in hierarchy view
	const getSubEventData = useCallback(
		async (id) => {
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
				// setHierarchy();
			} catch (error) {
				console.log('Error');
				setSubEventError(error.message);
			}
		},
		[parentId]
	);

	useEffect(() => {
		getSubEventData();
	}, [getSubEventData, parentId]);

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
			}}
		>
			{props.children}
		</EventContext.Provider>
	);
};

export default EventContext;
