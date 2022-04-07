import React, { Fragment } from 'react';
import { eventActions, fetchSelectAppData } from '../../store/event-slice';
import { useAppDispatch } from '../../store/hooks';
import { subEventActions } from '../../store/subevent-slice';
import classes from './Dropdown.module.css';

const Dropdown: React.FC<{
	names: string[] | undefined;
	value: string[] | '';
	// onChange: (event: React.FormEvent) => void;
}> = (props) => {
	const dispatch = useAppDispatch();

	let dropdownItems = props.names;

	// Render product names to dropdown select options
	let dropdownMenu;

	if (dropdownItems) {
		dropdownMenu =
			dropdownItems?.length > 0 &&
			dropdownItems.map((item) => (
				// <option key={item.id} value={item}> TODO Add unique key
				<option value={item}>{item}</option>
			));
	}

	const reset = () => {
		dispatch(eventActions.EVENT_RESET());
		// dispatch(eventActions.SET_SELECTED_EVENT([]));
		dispatch(subEventActions.SET_SUB_EVENTS([]));
		dispatch(subEventActions.SET_FETCH_ID(0));
		dispatch(subEventActions.RESET_HIERARCHY());
		dispatch(subEventActions.SET_PARENT_ID(0));
		dispatch(subEventActions.SET_SELECTED_SUB_EVENT([]));
		dispatch(subEventActions.SET_SUB_EVENT_PARENT_ID(0));
		// dispatch(subEventActions.SUB_EVENT_RESET());
	};

	const selectChangeHandler = (event: { target: { value: any } }) => {
		dispatch(fetchSelectAppData(event.target.value));
		reset();
	};

	return (
		<Fragment>
			<label>Select an Application</label>
			<select
				// name={props.name}
				className={classes.select}
				// value={props.value}
				onChange={selectChangeHandler}
			>
				<option value="Select">--Select--</option>

				{dropdownMenu}
			</select>
		</Fragment>
	);
};

export default Dropdown;

// return (
// 	<Fragment>
// 		<label htmlFor={props.name}>Select a Product Code</label>
// 		<select
// 			name={props.name}
// 			className={classes.select}
// 			value={props.value}
// 			onChange={props.onChange}
// 		>
// 			<option value="Select">--Select--</option>

// 			{dropdownMenu}
// 		</select>
// 	</Fragment>
// );
