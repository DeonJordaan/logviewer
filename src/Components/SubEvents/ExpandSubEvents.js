import React, { useContext } from 'react';

import classes from './ExpandSubEvents.module.css';

import EventContext from '../../Context/event-context';

const ExpandSubEvents = (props) => {
	const eventCtx = useContext(EventContext);

	let importedClasses = `${classes['sub-event-button']}`;

	if (props.subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const parentIdHandler = () => {
		eventCtx.setParentId(props.id);
	};
	return (
		<button onClick={parentIdHandler} className={importedClasses}>
			{props.subEvents}
		</button>
	);
};

export default ExpandSubEvents;
