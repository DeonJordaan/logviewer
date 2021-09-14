import React, { useState, useEffect } from 'react';

import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
import Pagination from './Components/UI/Pagination';
import TaskView from './Components/Tasks/TaskView';
import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';

function App() {
	// Listen for page load event and fetch first page data
	useEffect(() => {
		getEventData();
	}, []);

	const [tasks, setTasks] = useState([]);

	const [totalRecordCount, setTotalRecordCount] = useState([]);

	const [pageNumber, setPageNumber] = useState(1);

	// Pagination control
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

	useEffect(() => {
		getEventData();
	}, [pageNumber]);

	// Fetch data and sort and set tasks
	const getEventData = async () => {
		const response = await fetch(
			`http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber}&pageSize=10&hostname=`
			// `http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=2&pageSize=10&hostname=`
		);

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
	};

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

	return (
		<div className="App">
			<Header />
			<div className="display">
				<FilterBoard
					onGetData={getEventData}
					totalRecords={totalRecordCount}
				/>
				<div>
					<TaskView
						taskItems={tasks}
						setStatus={setStatusHandler}
						onGetSubEvents={getSubEventData}
					/>
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
