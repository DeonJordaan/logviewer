import React, { useContext } from 'react';

import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
import Pagination from './Components/UI/Pagination';
import TaskView from './Components/Tasks/TaskView';
import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';
import Footer from './Components/UI/Footer';
import EventContext from './store/event-context';
// import SubEventContext from './store/sub-event-context';

function App() {
	const eventCtx = useContext(EventContext);

	// const subEventCtx = useContext(SubEventContext);

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

	return (
		<div className="App">
			<Header />
			<div className="display">
				<FilterBoard />
				<div>
					{/* <section>{taskContent}</section> */}
					<TaskView
						taskItems={eventCtx.tasks}
						setStatus={setStatusHandler}
					/>
					<Pagination />
					{/* <section>{hierarchyContent}</section> */}
					<HierarchyView setStatus={setStatusHandler} />
					{/* <section>{subEventContent}</section> */}
					<SubEventView setStatus={setStatusHandler} />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;

//NOTE OLDER OPTIONS
//NOTE Define TaskView Content
// let taskContent = <p>'No data found'</p>;

// if (eventCtx.tasks) {
// 	taskContent = (
// 		<TaskView taskItems={eventCtx.tasks} setStatus={setStatusHandler} />
// 	);
// }

// if (eventCtx.error) {
// 	taskContent = <p>{eventCtx.error}</p>;
// }

// if (eventCtx.isLoading) {
// 	taskContent = <p>Loading...</p>;
// }

//NOTE Define HierarchyView Content
// let hierarchyContent = <p>'No event selected'</p>;

// if (subEventCtx.hierarchy.length > 0) {
// 	hierarchyContent = <HierarchyView setStatus={setStatusHandler} />;
// }

// if (subEventCtx.error) {
// 	hierarchyContent = <p>{subEventCtx.error}</p>;
// }

// if (subEventCtx.isLoading) {
// 	hierarchyContent = <p>Loading...</p>;
// }

//NOTE Define SubEventView Content
// let subEventContent = <p>'No event selected'</p>;

// if (subEventCtx.subEvents.length > 0) {
// 	subEventContent = <SubEventView setStatus={setStatusHandler} />;
// }

// if (subEventCtx.error) {
// 	subEventContent = <p>{subEventCtx.error}</p>;
// }

// if (subEventCtx.isLoading) {
// 	subEventContent = <p>Loading...</p>;
// }
