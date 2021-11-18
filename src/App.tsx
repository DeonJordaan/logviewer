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

function App() {
	const eventCtx = useContext(EventContext);

	//TODO => MOVE STATUS HANDLING TO A COMPONENT...???
	const setStatusHandler = (statusCode: keyof object): string => {
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
				<div className={'main-task-display'}>
					<TaskView
						taskItems={eventCtx.tasks}
						setStatus={setStatusHandler}
					/>
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
