import React, { useState } from 'react';

import './App.css';

import Header from './Components/Header';
import FilterMenuBar from './Components/FilterMenuBar';
import SearchBar from './Components/SearchBar';
import ButtonBar from './Components/ButtonBar';
import TaskView from './Components/TaskView';

const TASK_DATA = [
	{
		taskData:
			'WRSSyncMaster.AgentIQ WRSSynchroniser started: 2021-7-14 15:47:53.0 completed: 2021-7-14 15:48:0.0 Starting WRS Synchroniser Sub Events: 11',
	},
	{
		taskData:
			'WRSSyncMaster.PropIQ WRSSynchroniser started: 2021-7-14 15:48:0.0 completed: 2021-7-14 15:48:1.0 Starting WRS Synchroniser Sub Events: 3',
	},
	{
		taskData:
			'WRSSyncMaster.AgentIQ WRSSynchroniser started: 2021-7-14 15:52:38.0 completed: 2021-7-14 15:52:41.0 Starting WRS Synchroniser Sub Events: 9',
	},
	{
		taskData:
			'WRSSyncMaster.PropIQ WRSSynchroniser started: 2021-7-14 15:52:42.0 completed: 2021-7-14 15:52:43.0 Starting WRS Synchroniser Sub Events: 3',
	},
	{
		taskData:
			'WRSSyncMaster.SACompany WRSSynchroniser started: 2021-7-14 15:52:43.0 completed: 2021-7-14 15:55:16.0 Starting WRS Synchroniser Sub Events: 50',
	},
	{
		taskData:
			'WRSSyncMaster.SACompany WRSSynchroniser started: 2021-7-14 15:55:17.0 completed: 2021-7-14 15:55:17.0 Starting WRS Synchroniser Sub Events: 3',
	},
	{
		taskData:
			'WRSSyncMaster.MetroIQ WRSSynchroniser started: 2021-7-14 15:55:18.0 completed: 2021-7-14 15:55:18.0 Starting WRS Synchroniser Sub Events: 3',
	},
	{
		taskData:
			'WRSSyncMaster.AgentIQ WRSSynchroniser started: 2021-7-14 15:57:41.0 completed: 2021-7-14 15:57:43.0 Starting WRS Synchroniser Sub Events: 3',
	},
	{
		taskData:
			'WRSSyncMaster.PropIQ WRSSynchroniser started: 2021-7-14 15:57:43.0 completed: 2021-7-14 15:57:44.0 Starting WRS Synchroniser Sub Events: 3',
	},
	{
		taskData:
			'WRSSyncMaster.SACompany WRSSynchroniser started: 2021-7-14 15:57:44.0 completed: 2021-7-14 15:58:47.0 Starting WRS Synchroniser Sub Events: 11',
	},
];

function App() {
	const [tasks, setTasks] = useState(TASK_DATA);

	const addTaskHandler = (task) => {
		setTasks((prevTasks) => {
			return [task, ...prevTasks];
		});
	};

	return (
		<div className="App">
			<Header />
			<FilterMenuBar />
			<SearchBar />
			<ButtonBar onGetData={addTaskHandler} />
			<TaskView taskItems={tasks} />
		</div>
	);
}

export default App;
