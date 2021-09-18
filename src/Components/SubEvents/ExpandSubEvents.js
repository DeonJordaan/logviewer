import React, { useContext } from 'react';

import classes from './ExpandSubEvents.module.css';

import EventContext from '../../Context/event-context';

const ExpandSubEvents = (props) => {
	const eventCtx = useContext(EventContext);

	let importedClasses = `${classes['sub-event-button']}`;

	if (props.subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const findParentId = () => {
		console.log(props.id);
		eventCtx.getSubEvents(props.id);
	};
	// console.log(props.subEvents);

	return (
		// <div>
		<button onClick={findParentId} className={importedClasses}>
			{props.subEvents}
		</button>
		// </div>
	);
};

export default ExpandSubEvents;
