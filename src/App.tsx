import React, { useEffect } from 'react';

import useLocalStorage from 'use-local-storage';

import { useAppDispatch } from './store/hooks';
import { fetchEventData } from './store/event-slice';
import { fetchAppData } from './store/application-slice';
import { fetchHostData } from './store/host-slice';

import Header from './Layout/Header';
import SearchBar from './Components/SearchBar/SearchBar';
import TaskView from './Components/Tasks/TaskView';
import PaginationControl from './Components/Pagination/PaginationControl';
import HierarchyView from './Components/Hierarchy/HierarchyView';
import SubEventView from './Components/SubEvents/SubEventView';
import Footer from './Layout/Footer';

import './App.css';

function App() {
	const defaultDark = window.matchMedia(
		'(prefers-color-scheme: dark)'
	).matches;
	const [theme, setTheme] = useLocalStorage(
		'theme',
		defaultDark ? 'dark' : 'light'
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchEventData());
		dispatch(fetchAppData());
		dispatch(fetchHostData());
	}, [dispatch]);

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

	const switchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		console.log(theme);
	};

	return (
		<div className="App" data-theme={theme}>
			<Header switchTheme={switchTheme} />
			<div className="display">
				<SearchBar />
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
