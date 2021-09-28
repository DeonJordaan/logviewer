import React, { useContext } from 'react';

import EventContext from '../../Context/event-context';

import classes from './ExpandSubEvents.module.css';

const ExpandSubEvents = (props) => {
	const eventCtx = useContext(EventContext);

	const setParentId = eventCtx.setParentId;

	const id = props.id;

	let importedClasses = `${classes['sub-event-button']}`;

	if (props.subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const parentIdHandler = async () => {
		setParentId(id);
	};

	return (
		<button onClick={parentIdHandler} className={importedClasses}>
			{props.subEvents}
		</button>
	);
};

export default ExpandSubEvents;
