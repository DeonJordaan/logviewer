import React, { Fragment } from 'react';
import classes from './Dropdown.module.css';

const Dropdown: React.FC<{
	names: string[] | undefined;
	value: string[] | '';
	// onChange: (event: React.FormEvent) => void;
}> = (props) => {
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

	return (
		<Fragment>
			<label>Select a Product Code</label>
			<select
				// name={props.name}
				className={classes.select}
				// value={props.value}
				// onChange={props.onChange}
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
