import React, { useState, useEffect, useCallback } from 'react';

import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
import Pagination from './Components/UI/Pagination';
import TaskView from './Components/Tasks/TaskView';
import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';

function App() {
	const [tasks, setTasks] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);
	const [totalRecordCount, setTotalRecordCount] = useState([]);

	//NOTE Pagination control
	const [pageNumber, setPageNumber] = useState(1);

	const totalPageCount = Math.ceil(totalRecordCount / 10);

	const getNextPage = () => {
		setPageNumber((page) => page + 1);
	};

	const getPrevPage = () => {
		setPageNumber((page) => page - 1);
	};

	const goToFirstPage = () => {
		setPageNumber((page) => (page = 1));
	};

	const goToLastPage = () => {
		setPageNumber((page) => (page = totalPageCount));
	};

	//NOTE Fetch data, sort and set tasks
	const getEventData = useCallback(async () => {
		// setIsLoading(true);
		// setError(null);
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
			// setError(error.message);
		}
		// setIsLoading(false);
	}, [pageNumber]);

	useEffect(() => {
		getEventData();
	}, [getEventData, pageNumber]);

	//NOTE Fetch data, sort and set subEvents
	const [subEvents, setSubEvents] = useState([]);

	const [Hierarchy, setHierarchy] = useState({});

	// FIXME Trying to get setHierarchy to work via useMemo
	// let selectedTask = useMemo(() => {
	// 	return [];
	// }, []);

	// useEffect(() => setHierarchy(selectedTask), [selectedTask]);

	/////////////////////////
	// Fetch sub-event data and extract selected event data to insert in hierarchy view

	const getSubEventData = async (id) => {
		console.log(id);
		const parentId = id;
		// const parentId = id.toString();

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

	// setSubEvents(allData);
	// useEffect(() => setSubEvents(subEventTasks), [subEventTasks]);

	// const selectedTask = tasks.filter(
	// 	(task) => task.id === parseInt(parentId)
	// );

	const setStatusHandler = (statusCode) => {
		const status = {
			0: 'NotSet',
			1: 'Started',
			2: 'Completed',
			3: 'Aborted',
			4: 'Failed',
		};
		return status[statusCode];
	};

	//NOTE Define taskContent
	let taskContent = <p>'No data found'</p>;

	if (tasks.length > 0) {
		taskContent = (
			<TaskView
				taskItems={tasks}
				setStatus={setStatusHandler}
				onGetSubEvents={getSubEventData}
			/>
		);
	}

	// if (error) {
	// 	taskContent = <p>{error}</p>;
	// }

	// if (isLoading) {
	// 	taskContent = <p>Loading...</p>;
	// }

	return (
		<div className="App">
			<Header />
			<div className="display">
				<FilterBoard
					onGetData={getEventData}
					totalRecords={totalRecordCount}
				/>
				<div>
					<section>{taskContent}</section>
					<Pagination
						nextPage={getNextPage}
						prevPage={getPrevPage}
						firstPage={goToFirstPage}
						lastPage={goToLastPage}
						pageNumber={pageNumber}
						totalPageCount={totalPageCount}
					/>
					<HierarchyView
						hierarchyData={Hierarchy}
						setStatus={setStatusHandler}
					/>
					<SubEventView
						subEventItems={subEvents}
						setStatus={setStatusHandler}
						onGetSubEvents={getSubEventData}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;

/////////////////////////
// Fetch sub-event data and extract selected event data to insert in hierarchy view
// async function getSubEventData(e) {
// 	const parentData = e.target.parentElement;
// 	// console.log(parentData);
// 	const parentElement = parentData.closest('.task-item');
// 	// const parentElement = parentData.closest('.sub-event-item');
// 	// console.log(parentElement);
// 	const parentIdElement = parentElement.querySelector('.id');
// 	const parentId = parentIdElement.innerText;

// 	const selectedTask = tasks.filter(
// 		(task) => task.id === parseInt(parentId)
// 	);

// 	// console.log(selectedTask[0]);

// 	setHierarchy(selectedTask[0]);

// 	// console.log(Hierarchy);

// 	const response = await fetch(
// 		`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`
// 	);

// 	const data = await response.json();

// 	const allData = data.Data;

// 	const allTasks = allData.map((taskData) => {
// 		return {
// 			id: taskData.Id,
// 			app: taskData.AppName,
// 			taskCode: taskData.Code,
// 			startTime: taskData.Started,
// 			endTime: taskData.Completed,
// 			subEvents: taskData.SubEventCount,
// 			host: taskData.Host,
// 			message: taskData.Message,
// 			status: taskData.Status,
// 		};
// 	});
// 	setSubEvents(allTasks);
