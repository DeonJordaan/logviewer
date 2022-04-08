import React, { Fragment } from 'react';
import { eventActions, fetchSelectAppData } from '../../store/event-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { paginationActions } from '../../store/pagination-slice';
import { subEventActions } from '../../store/subevent-slice';
import classes from './Dropdown.module.css';

const Dropdown: React.FC = () => {
	const dispatch = useAppDispatch();

	const { applications } = useAppSelector((state) => state.applications);
	console.log(applications);

	// Render product names to dropdown select options
	let dropdownMenu;

	if (applications) {
		dropdownMenu =
			applications?.length > 0 &&
			applications.map((item) => (
				<option key={item.Id} value={item.appName}>
					{item.appName}
				</option>
			));
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

	const selectChangeHandler = (event: { target: { value: any } }) => {
		dispatch(fetchSelectAppData(event.target.value));
		reset();
	};

	return (
		<Fragment>
			<label>Select an Application</label>
			<select className={classes.select} onChange={selectChangeHandler}>
				<option value="Select">--Select--</option>

				{dropdownMenu}
			</select>
		</Fragment>
	);
};

export default Dropdown;
