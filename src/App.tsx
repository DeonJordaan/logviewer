import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
import Pagination from './Components/UI/Pagination';
import TaskView from './Components/Tasks/TaskView';
import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';
import Footer from './Components/UI/Footer';
import Status from './Interfaces/statusInterface';
// import EventContext from './store/event-context';

function App() {
	// const eventCtx = useContext(EventContext);

	//TODO => MOVE STATUS HANDLING TO A COMPONENT...???

	// const setStatusHandler = (statusCode: number) => {
	function setStatusHandler(statusCode: number) {
		switch () {
			case 0:
				return 'NotSet';
				break;
			case 1:
				return 'Started';
				break;
			case 2:
				return 'Completed';
				break;
			case 3:
				return 'Aborted';
				break;
			case 4:
				return 'Failed';
				break;
		}
	}

	// const setStatusHandler = (statusCode: keyof Status): string => {
	// 	const status: Status = {
	// 		0: 'NotSet',
	// 		1: 'Started',
	// 		2: 'Completed',
	// 		3: 'Aborted',
	// 		4: 'Failed',
	// 	};
	// 	return status[statusCode];
	// };

	return (
		<div className="App">
			<Header />
			<div className="display">
				<FilterBoard />
				<div className={'main-task-display'}>
					<TaskView setStatus={setStatusHandler} />
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
