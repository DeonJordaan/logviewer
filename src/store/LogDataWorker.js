// NOTE - EXPERIMENTAL - NOT CURRENTLY IN USE

import { useState, useEffect, useReducer } from 'react';

import useFetch from './useFetch';

import { paginationReducer } from '../Components/UI/Pagination';

const LogDataWorker = () => {
	const [tasks, setTasks] = useState(null);
	const [subEvents, setSubEvents] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalRecordCount, setTotalRecordCount] = useState([]);
	const [isLoadingSubEvents, setIsLoadingSubEvents] = useState(false);
	const [subEventError, setSubEventError] = useState(null);
	const [parentId, setParentId] = useState(0);
	const [selectedTask, setSelectedTask] = useState([
		{
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
		},
	]);
	const [hierarchy, setHierarchy] = useState([
		{
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
		},
	]);
	const [pageNumber, dispatchPageNumber] = useReducer(paginationReducer, {
		page: 1,
	});

	//NOTE Fetch data, sort and set tasks
	const {
		data: taskData,
		isLoading: tasksLoading,
		error: taskError,
	} = useFetch(
		`http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber.page}&pageSize=10&hostname=`
	);

	setIsLoading(tasksLoading);
	setError(taskError);

	const { Data: allTaskData, TotalRecordCount: recordCount } = taskData;

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
		`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`
	);

	setIsLoadingSubEvents(subEventsLoading);
	setSubEventError(subEventErrorIncoming);

	const allSubEventData = subEventData.Data;

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

	return {
		tasks,
		isLoading,
		error,
		subEvents,
		isLoadingSubEvents,
		subEventError,
		totalRecordCount,
		hierarchy,
		dispatchPageNumber,
		setParentId,
	};
};

export default LogDataWorker;

////////////////////////////////

// useEffect(() => {
// 	getEventData();
// }, [getEventData, parentId]);

// useEffect(() => {
// 	getSubEventData();
// }, [getSubEventData, parentId]);

// const data = {
//     tasks: tasks
// }

//TODO SUGGESTIONS

// function GetEventData(eventId) {

// }

// function FirstPage() {
// 	// Set page number to 1
// 	// Clear all existing data
// 	// retrieve page 1
// 	// set logpagedata variable
// 	// return logpagedata variable

// 	return [

// 	]
// 	}
// }
// function NextPage() {

// }

// function PreviousPage() {

// }

// function LastPage() {

// }

//////////////////////////
// class DataWorker {

//     firstPage() {
//     }

//     nextPage() {

//     }

//     previousPage() {

//     }

//     lastPage() {

//     }
// }

//NOTE OLD FETCH REQUEST BEFORE INCORPORATING useFetch
// const getEventData = () => {
// 	const { data, isLoading, error } = useFetch(
// 		`http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber.page}&pageSize=10&hostname=`
// 	);

// 	const { Data: allData, TotalRecordCount: recordCount } = data;

// 	const allTasks = allData.map((taskData) => {
// 		return {
// 			key: taskData.Id,
// 			id: taskData.Id,
// 			App: taskData.AppName,
// 			taskCode: taskData.Code,
// 			startTime: taskData.Started,
// 			endTime: taskData.Completed,
// 			subEvents: taskData.SubEventCount,
// 			host: taskData.Host,
// 			message: taskData.Message,
// 			status: taskData.Status,
// 		};
// 	});

// 	setTasks(allTasks);
// 	setTotalRecordCount(recordCount);
// };
