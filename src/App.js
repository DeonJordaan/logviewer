import React, { useState } from 'react';

import './App.css';

import Header from './Components/UI/Header';
import FilterMenuBar from './Components/Filter/FilterMenuBar';
import SearchBar from './Components/SearchBar/SearchBar';
import ButtonBar from './Components/ButtonBar/ButtonBar';
import TaskView from './Components/Tasks/TaskView';

function App() {
	const [tasks, setTasks] = useState([]);

	async function gitSomeData() {
		const response = await fetch(
			'http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=1&pageSize=10&hostname='
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
			};
		});

		setTasks(allTasks);
		console.log(data); // CHECK DATA
		console.log(allData); // CHECK DATA
	}

	return (
		<div className="App">
			<Header />
			<FilterMenuBar />
			<SearchBar />
			<TaskView taskItems={tasks} />
			<ButtonBar onGetData={gitSomeData} />
		</div>
	);
}

export default App;

// NOTE Default task data as Array
// const tasks = [
// 	'WRSSyncMaster.AgentIQ WRSSynchroniser started: 2021-7-14 15:47:53.0 completed: 2021-7-14 15:48:0.0 Starting WRS Synchroniser Sub Events: 11',

// 	'WRSSyncMaster.PropIQ WRSSynchroniser started: 2021-7-14 15:48:0.0 completed: 2021-7-14 15:48:1.0 Starting WRS Synchroniser Sub Events: 3',

// 	'WRSSyncMaster.AgentIQ WRSSynchroniser started: 2021-7-14 15:52:38.0 completed: 2021-7-14 15:52:41.0 Starting WRS Synchroniser Sub Events: 9',

// 	'WRSSyncMaster.PropIQ WRSSynchroniser started: 2021-7-14 15:52:42.0 completed: 2021-7-14 15:52:43.0 Starting WRS Synchroniser Sub Events: 3',

// 	'WRSSyncMaster.SACompany WRSSynchroniser started: 2021-7-14 15:52:43.0 completed: 2021-7-14 15:55:16.0 Starting WRS Synchroniser Sub Events: 50',

// 	'WRSSyncMaster.SACompany WRSSynchroniser started: 2021-7-14 15:55:17.0 completed: 2021-7-14 15:55:17.0 Starting WRS Synchroniser Sub Events: 3',

// 	'WRSSyncMaster.MetroIQ WRSSynchroniser started: 2021-7-14 15:55:18.0 completed: 2021-7-14 15:55:18.0 Starting WRS Synchroniser Sub Events: 3',

// 	'WRSSyncMaster.AgentIQ WRSSynchroniser started: 2021-7-14 15:57:41.0 completed: 2021-7-14 15:57:43.0 Starting WRS Synchroniser Sub Events: 3',

// 	'WRSSyncMaster.PropIQ WRSSynchroniser started: 2021-7-14 15:57:43.0 completed: 2021-7-14 15:57:44.0 Starting WRS Synchroniser Sub Events: 3',

// 	'WRSSyncMaster.SACompany WRSSynchroniser started: 2021-7-14 15:57:44.0 completed: 2021-7-14 15:58:47.0 Starting WRS Synchroniser Sub Events: 11',
// ];

// NOTE Default task data as Object
// const TASK_DATA = [
// 	{
// 		taskData:
// 			'WRSSyncMaster.AgentIQ WRSSynchroniser started: 2021-7-14 15:47:53.0 completed: 2021-7-14 15:48:0.0 Starting WRS Synchroniser Sub Events: 11',
// 	},
// 	{
// 		taskData:
// 			'WRSSyncMaster.PropIQ WRSSynchroniser started: 2021-7-14 15:48:0.0 completed: 2021-7-14 15:48:1.0 Starting WRS Synchroniser Sub Events: 3',
// 	},
// 	{
// 		taskData:
// 			'WRSSyncMaster.AgentIQ WRSSynchroniser started: 2021-7-14 15:52:38.0 completed: 2021-7-14 15:52:41.0 Starting WRS Synchroniser Sub Events: 9',
// 	},
// 	{
// 		taskData:
// 			'WRSSyncMaster.PropIQ WRSSynchroniser started: 2021-7-14 15:52:42.0 completed: 2021-7-14 15:52:43.0 Starting WRS Synchroniser Sub Events: 3',
// 	},
// 	{
// 		taskData:
// 			'WRSSyncMaster.SACompany WRSSynchroniser started: 2021-7-14 15:52:43.0 completed: 2021-7-14 15:55:16.0 Starting WRS Synchroniser Sub Events: 50',
// 	},
// 	{
// 		taskData:
// 			'WRSSyncMaster.SACompany WRSSynchroniser started: 2021-7-14 15:55:17.0 completed: 2021-7-14 15:55:17.0 Starting WRS Synchroniser Sub Events: 3',
// 	},
// 	{
// 		taskData:
// 			'WRSSyncMaster.MetroIQ WRSSynchroniser started: 2021-7-14 15:55:18.0 completed: 2021-7-14 15:55:18.0 Starting WRS Synchroniser Sub Events: 3',
// 	},
// 	{
// 		taskData:
// 			'WRSSyncMaster.AgentIQ WRSSynchroniser started: 2021-7-14 15:57:41.0 completed: 2021-7-14 15:57:43.0 Starting WRS Synchroniser Sub Events: 3',
// 	},
// 	{
// 		taskData:
// 			'WRSSyncMaster.PropIQ WRSSynchroniser started: 2021-7-14 15:57:43.0 completed: 2021-7-14 15:57:44.0 Starting WRS Synchroniser Sub Events: 3',
// 	},
// 	{
// 		taskData:
// 			'WRSSyncMaster.SACompany WRSSynchroniser started: 2021-7-14 15:57:44.0 completed: 2021-7-14 15:58:47.0 Starting WRS Synchroniser Sub Events: 11',
// 	},
// ];
