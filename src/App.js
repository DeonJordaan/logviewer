import React, { useContext } from 'react';

import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
import Pagination from './Components/UI/Pagination';
import TaskView from './Components/Tasks/TaskView';
import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';
import EventContext from './Context/event-context';
import Footer from './Components/UI/Footer';

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
					<HierarchyView setStatus={setStatusHandler} />
					<SubEventView setStatus={setStatusHandler} />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
