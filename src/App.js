import React, { useContext } from 'react';

import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
import Pagination from './Components/UI/Pagination';
import TaskView from './Components/Tasks/TaskView';
import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';
<<<<<<< HEAD
import EventContext from './Context/event-context';
import Footer from './Components/UI/Footer';
=======
import EventContext from './store/event-context';
>>>>>>> 76d5e80 (Trying a custom useFetch hook and working on the data-worker)

function App() {
	const eventCtx = useContext(EventContext);

	//TODO => MOVE STATUS HANDLING TO A COMPONENT...???
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

	if (eventCtx.tasks) {
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

	//NOTE Define HierarchyView Content
	let hierarchyContent = <p>'No event selected'</p>;

	if (eventCtx.tasks.length > 0) {
		hierarchyContent = <HierarchyView setStatus={setStatusHandler} />;
	}

	if (eventCtx.error) {
		hierarchyContent = <p>{eventCtx.error}</p>;
	}

	if (eventCtx.isLoading) {
		hierarchyContent = <p>Loading...</p>;
	}

	//NOTE Define SubEventView Content
	let subEventContent = <p>'No event selected'</p>;

	if (eventCtx.tasks.length > 0) {
		subEventContent = <SubEventView setStatus={setStatusHandler} />;
	}

	if (eventCtx.error) {
		subEventContent = <p>{eventCtx.error}</p>;
	}

	if (eventCtx.isLoading) {
		subEventContent = <p>Loading...</p>;
	}

	return (
		<div className="App">
			<Header />
			<div className="display">
				<FilterBoard />
				<div>
					<section>{taskContent}</section>
					<Pagination />
					<section>{hierarchyContent}</section>
					<section>{subEventContent}</section>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
