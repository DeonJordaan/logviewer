import React, { useState, useCallback } from 'react';

const EventContext = React.createContext({
	tasks: [],
	subEvents: [],
	isLoading: false,
	error: null,
	totalRecordCount: [],
	pageNumber: 1,
	getEventData: () => {},
	getSubEventData: () => {},
	setPageNumber: () => {},
});

export const EventContextProvider = (props) => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalRecordCount, setTotalRecordCount] = useState([]);
	const [subEvents, setSubEvents] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);

	//NOTE Fetch data, sort and set tasks
	const getEventData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber}&pageSize=10&hostname=`
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
	const getSubEventData = async (id) => {
		console.log(id);
		const parentId = id;

		const response = await fetch(
			// `http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=15001`
			`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`
		);

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
	};

	return (
		<EventContext.Provider
			value={{
				tasks: tasks,
				subEvents: subEvents,
				isLoading: isLoading,
				error: error,
				totalRecordCount: totalRecordCount,
				getEventData: getEventData,
				getSubEventData: getSubEventData,
				setPageNumber: setPageNumber,
				pageNumber: pageNumber,
			}}
		>
			{props.children}
		</EventContext.Provider>
	);
};

export default EventContext;
