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

	// let pageNumber = 1;

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
		console.log(allTasks);
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

		console.log(parentDataArray);
		console.log(parentDataTextArray);

		const parentObject = {
			host: parentDataTextArray[0],
			id: parentDataTextArray[6],
			app: parentDataTextArray[1],
			subEvents: parentDataTextArray[5],
			taskCode: parentDataTextArray[2],
			startTime: parentDataTextArray[3],
			endTime: parentDataTextArray[4],
			message: parentDataTextArray[7],
		};

		setHierarchy(parentObject);

		let parentId = parentObject.id;

		const response = await fetch(
			`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`
		);

		const data = await response.json();

		const allData = data.Data;

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
					<SubEventView subEventItems={subEvents} />
				</div>
			</div>
		</div>
	);
}

export default App;
