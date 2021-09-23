import React, { useState } from 'react';

const LogDataWorker = () => {
	const [tasks, setTasks] = useState([]);
	const [subEvents, setSubEvents] = useState([]);
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

    function GetEventData(eventId) {
        
    }

    function FirstPage() {
        // Set page number to 1
        // Clear all existing data
        // retrieve page 1
        // set logpagedata variable
        // return logpagedata variable

        return [

        ]
        }
    }
    function NextPage() {

    }

    function PreviousPage() {

    }

    function LastPage() {

    }





	//NOTE Fetch data, sort and set tasks
	const getEventData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber.page}&pageSize=10&hostname=`
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

	//TODO Combine the data parsing into a separate function
	//NOTE Fetch sub-event data and extract selected event data to insert in hierarchy view
	const getSubEventData = useCallback(async () => {
		setIsLoadingSubEvents(true);
		setSubEventError(null);
		try {
			const response = await fetch(
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
			setSelectedTask(
				tasks.filter((task) => task.id === parseInt(parentId))
			);
			// console.log(parentId);
			// setHierarchy(parentId);
			// console.log(hierarchy);
		} catch (error) {
			console.log('Error');
			setSubEventError(error.message);
		}
	}, [parentId]);
};

useEffect(() => {
	getSubEventData();
}, [getSubEventData, parentId]);

useEffect(() => {
	setHierarchy(selectedTask);
}, [selectedTask]);

const data = {
    tasks: tasks
}

return (
    
);

export default dataWorker;


 class DataWorker {

    firstPage() {
    }

    nextPage() {

    }

    previousPage() {

    }

    lastPage() {

    }
}