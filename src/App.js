import React, { useState, useEffect } from 'react';

import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
// import ButtonBar from './Components/ButtonBar/ButtonBar';
import PaginationNew from './Components/UI/PaginationNew';
import TaskView from './Components/Tasks/TaskView';
import SubEventView from './Components/SubEvents/SubEventView';

function App() {
	useEffect(() => {
		window.addEventListener('DOMContentLoaded', (event) => {
			getEventData();
		});
	});

	const [tasks, setTasks] = useState([]);

	const [totalRecordCount, setTotalRecordCount] = useState([]);

	const [pageNumber, setPageNumber] = useState(1);
	// let pageNumber = 1;

	async function getEventData() {
		const response = await fetch(
			`http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber}&pageSize=10&hostname=`
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
		// console.log(allData);
	}

	const getNextPage = () => {
		console.log(pageNumber);
		setPageNumber((page) => page + 1);
		getEventData();
	};

	const [subEvents, setSubEvents] = useState([]);

	async function getSubEventData(e) {
		const parentId = e.target.nextElementSibling.innerText; //FIXME: I really don't like this solution of fetching the id from the sibling. How can I extract it from the data received?
		console.log(typeof parentId);

		const response = await fetch(
			`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`
		);

		const data = await response.json();

		const allData = data.Data;

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
					{/* <ButtonBar */}
					<PaginationNew
						getData={getEventData}
						nextPage={getNextPage}
						pageNumber={pageNumber}
						totalRecordCount={totalRecordCount}
					/>
					<SubEventView subEventItems={subEvents} />
				</div>
			</div>
		</div>
	);
}

export default App;
