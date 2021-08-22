import React, { useState, useEffect } from 'react';

import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
import Pagination from './Components/UI/Pagination';
import TaskView from './Components/Tasks/TaskView';
import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';

function App() {
	useEffect(() => {
		window.addEventListener('load', (event) => {
			getEventData();
		});
	});

	const [tasks, setTasks] = useState([]);

	const [totalRecordCount, setTotalRecordCount] = useState([]);

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

	useEffect(() => getEventData(), [pageNumber]);

	async function getEventData() {
		const response = await fetch(
			`http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber}&pageSize=10&hostname=`
			// `http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=2&pageSize=10&hostname=`
		);

		const data = await response.json();

		const { Data: allData, TotalRecordCount: recordCount } = data;

		const allTasks = allData.map((taskData) => {
			return {
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
		// console.log(allTasks);
	}

	const [subEvents, setSubEvents] = useState([]);

	const [Hierarchy, setHierarchy] = useState({});

	async function getSubEventData(e) {
		const parentData = e.target.parentElement.childNodes;

		const parentDataArray = [...parentData];

		let parentDataTextArray = [];
		for (let item of parentDataArray) {
			parentDataTextArray.push(item.innerText);
		}

		// console.log(parentDataArray);
		// console.log(parentDataTextArray);

		//FIXME This is shit.
		const parentObject = {
			host: parentDataTextArray[0],
			id: parentDataTextArray[7],
			app: parentDataTextArray[1],
			subEvents: parentDataTextArray[6],
			taskCode: parentDataTextArray[3],
			startTime: parentDataTextArray[4],
			endTime: parentDataTextArray[5],
			message: parentDataTextArray[8],
			status: parentDataTextArray[2],
		};

		setHierarchy(parentObject);

		let parentId = parentObject.id;

		console.log(parentId);

		// if (tasks.includes((task) => task.id === parentId)) {
		// 	console.log('got it');
		// }

		const findId = (task) => {
			//FIXME TRYING TO EXTRACT THE TASK FROM THE 'tasks' STATE VIA ITS ID, A THAT IS A MORE ROBUST WAY OF PROCESSING IT FOR THE HIERARCHY DISPLAY THAN THE METHOD ABOVE
			if (task.id === parentId) {
				return task;
			}
		};

		const theTask = tasks.filter(findId);
		console.log(theTask);

		const response = await fetch(
			`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`
		);

		const data = await response.json();
		// console.log(data);

		const allData = data.Data;
		// console.log(allData);

		const allTasks = allData.map((taskData) => {
			return {
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
		setSubEvents(allTasks);
	}

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
						onGetSubEvents={getSubEventData}
						setStatus={setStatusHandler}
					/>
					<Pagination
						nextPage={getNextPage}
						prevPage={getPrevPage}
						firstPage={goToFirstPage}
						lastPage={goToLastPage}
						pageNumber={pageNumber}
						totalPageCount={totalPageCount}
					/>
					<HierarchyView hierarchyData={Hierarchy} />
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
