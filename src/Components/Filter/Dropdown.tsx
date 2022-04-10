import React, { Fragment } from 'react';
import {
	eventActions,
	fetchSelectAppData,
	fetchSelectHostData,
} from '../../store/event-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { paginationActions } from '../../store/pagination-slice';
import { subEventActions } from '../../store/subevent-slice';
import classes from './Dropdown.module.css';

const Dropdown: React.FC<{
	label: string;
}> = (props) => {
	const dispatch = useAppDispatch();

	const { applications } = useAppSelector((state) => state.applications);
	const { hosts } = useAppSelector((state) => state.hosts);

	let dropdownMenu;

	let selectChangeHandler;

	const label = props.label;

	// Render product names to dropdown select options
	if (label === 'Application') {
		if (applications) {
			dropdownMenu =
				applications?.length > 0 &&
				applications.map((app) => (
					<option key={app.Id} value={app.appName}>
						{app.appName}
					</option>
				));
		}

		selectChangeHandler = (event: { target: { value: any } }) => {
			dispatch(fetchSelectAppData(event.target.value));
			reset();
		};
	} else if (label === 'Host') {
		if (hosts) {
			dropdownMenu =
				hosts?.length > 0 &&
				hosts.map((host) => (
					<option key={host.Id} value={host.hostName}>
						{host.hostName}
					</option>
				));
		}

		selectChangeHandler = (event: { target: { value: any } }) => {
			dispatch(fetchSelectHostData(event.target.value));
			reset();
		};
	}

	const reset = () => {
		dispatch(eventActions.EVENT_RESET());
		dispatch(subEventActions.SET_SUB_EVENTS([]));
		dispatch(subEventActions.SET_FETCH_ID(0));
		dispatch(subEventActions.RESET_HIERARCHY());
		dispatch(subEventActions.SET_PARENT_ID(0));
		dispatch(subEventActions.SET_SELECTED_SUB_EVENT([]));
		dispatch(subEventActions.SET_SUB_EVENT_PARENT_ID(0));
		dispatch(paginationActions.FIRST_PAGE());
	};

	return (
		<Fragment>
			<label>{label}</label>
			<select className={classes.select} onChange={selectChangeHandler}>
				<option value="Select">--Select--</option>
				{dropdownMenu}
			</select>
		</Fragment>
	);
};

export default Dropdown;
