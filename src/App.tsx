import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
import Pagination from './Components/UI/Pagination';
import TaskView from './Components/Tasks/TaskView';
import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';
import Footer from './Components/UI/Footer';
import { AppListContextProvider } from './store/app-list-context';
// import Status from './Interfaces/statusInterface';
// import EventContext from './store/event-context';

function App() {
	// const eventCtx = useContext(EventContext);

	//TODO => MOVE STATUS HANDLING TO A COMPONENT...???
	function setStatusHandler(statusCode: number) {
		let status = '';
		switch (statusCode) {
			case 0: {
				status = 'NotSet';
				break;
			}
			case 1: {
				status = 'Started';
				break;
			}
			case 2: {
				status = 'Completed';
				break;
			}
			case 3: {
				status = 'Aborted';
				break;
			}
			case 4: {
				status = 'Failed';
				break;
			}
		}
		return status;
	}

	return (
		<div className="App">
			<Header />
			<div className="display">
				<AppListContextProvider>
					<FilterBoard />
				</AppListContextProvider>
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

//NOTE SETTING STATUS WITH OBJECT LITERAL - PREFER IT, BUT CANNOT RESOLVE TYPE ERRORS WITH THIS OPTION

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
