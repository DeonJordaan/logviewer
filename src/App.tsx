import React, { useEffect } from 'react';

import './App.css';

import Header from './Components/UI/Header';
import FilterBoard from './Components/Filter/FilterBoard';
import PaginationControl from './Components/UI/PaginationControl';
import TaskView from './Components/Tasks/TaskView';
import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';
import Footer from './Components/UI/Footer';
import { AppListContextProvider } from './store/app-list-context';
import { useAppDispatch } from './store/hooks';
import { fetchEventData } from './store/event-slice';
// import { fetchSubEventData } from './store/subevent-slice';
import { getPaginationData } from './store/pagination-slice';
import { fetchAppData } from './store/application-slice';
// import Status from './Interfaces/statusInterface';

function App() {
	const dispatch = useAppDispatch();
	// const { fetchId } = useAppSelector((state) => state.subEvents);

	useEffect(() => {
		dispatch(fetchEventData());
		dispatch(getPaginationData());
		dispatch(fetchAppData());
	}, [dispatch]);

	// useCallback(() => {
	// 	// dispatch(fetchSubEventData(fetchId))
	// 	// if (subEvents.length > 0) {
	// 	dispatch(fetchSubEventData(fetchId));
	// 	// }
	// }, [dispatch, fetchId]);

	//TODO => MOVE STATUS HANDLING TO A COMPONENT...???
	function setStatusHandler(statusCode: number) {
		let status = '';
		// TODO Name the cases descriptively
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
		// FIXME Add default
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
					<PaginationControl />
					<HierarchyView setStatus={setStatusHandler} />
					<SubEventView setStatus={setStatusHandler} />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default React.memo(App);

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
