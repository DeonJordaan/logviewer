import React, { useEffect, useContext } from 'react';

import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
import Pagination from './Components/UI/Pagination';
import TaskView from './Components/Tasks/TaskView';
// import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';
import EventContext from './Context/event-context';

function App() {
	//FIXME

	const eventCtx = useContext(EventContext);

	//TODO Do I need this initial useEffect for some reason? Initial load seems to work
	// useEffect(() => {
	// 	eventCtx.getEventData();
	// }, []);

	//FIXME => MOVE STATUS HANDLING TO A COMPONENT...???
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

	//NOTE Define TaskView Content
	let taskContent = <p>'No data found'</p>;

	if (eventCtx.tasks.length > 0) {
		taskContent = (
			<TaskView taskItems={eventCtx.tasks} setStatus={setStatusHandler} />
		);
	}

	if (eventCtx.error) {
		taskContent = <p>{eventCtx.error}</p>;
	}

	if (eventCtx.isLoading) {
		taskContent = <p>Loading...</p>;
	}

	//TODO => SET CONTENT FOR HIERARCHY
	//NOTE Define HierarchyView Content

	//TODO => SET CONTENT FOR SUB-EVENTS
	//NOTE Define SubEventView Content

	return (
		<div className="App">
			<Header />
			<div className="display">
				<FilterBoard />
				<div>
					<section>{taskContent}</section>
					<Pagination />
					{/* <HierarchyView
						// hierarchyData={hierarchy}
						setStatus={setStatusHandler}
					/> */}
					<SubEventView setStatus={setStatusHandler} />
				</div>
			</div>
		</div>
	);
}

export default App;

//NOTE POSSIBLE FIXME Fetch request moved to EventContext

// const [tasks, setTasks] = useState([]);
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState(null);
// const [totalRecordCount, setTotalRecordCount] = useState([]);

//NOTE Fetch data, sort and set tasks
// const getEventData = useCallback(async () => {
// 	setIsLoading(true);
// 	setError(null);
// 	try {
// 		const response = await fetch(
// 			`http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber}&pageSize=10&hostname=`
// 			// `http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=2&pageSize=10&hostname=`
// 		);

// 		if (!response.ok) {
// 			throw new Error('Could not retrieve data');
// 		}

// 		const data = await response.json();

// 		const { Data: allData, TotalRecordCount: recordCount } = data;

// 		const allTasks = allData.map((taskData) => {
// 			return {
// 				key: taskData.Id,
// 				id: taskData.Id,
// 				App: taskData.AppName,
// 				taskCode: taskData.Code,
// 				startTime: taskData.Started,
// 				endTime: taskData.Completed,
// 				subEvents: taskData.SubEventCount,
// 				host: taskData.Host,
// 				message: taskData.Message,
// 				status: taskData.Status,
// 			};
// 		});

// 		setTasks(allTasks);
// 		setTotalRecordCount(recordCount);
// 	} catch (error) {
// 		console.log('Error');
// 		setError(error.message);
// 	}
// 	setIsLoading(false);
// }, [pageNumber]);

/////////////////////////
//NOTE Fetch data, sort and set subEvents
// const [subEvents, setSubEvents] = useState([]);

// // Fetch sub-event data and extract selected event data to insert in hierarchy view

// const getSubEventData = async (id) => {
// 	console.log(id);
// 	const parentId = id;

// 	const response = await fetch(
// 		// `http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=15001`
// 		`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`
// 	);

// 	const data = await response.json();
// 	const allData = data.Data;

// 	const subEventTasks = allData.map((taskData) => {
// 		return {
// 			key: taskData.Id,
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

// 	setSubEvents(subEventTasks);
// };

// setSubEvents(allData);
// useEffect(() => setSubEvents(subEventTasks), [subEventTasks]);

// const selectedTask = tasks.filter(
// 	(task) => task.id === parseInt(parentId)
// );
