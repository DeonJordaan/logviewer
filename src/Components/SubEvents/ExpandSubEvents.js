import React, { useContext } from 'react';

import classes from './ExpandSubEvents.module.css';

import EventContext from '../../store/event-context';
import SubEventContext from '../../store/sub-event-context';

const ExpandSubEvents = (props) => {
	const eventCtx = useContext(EventContext);
	const subEventCtx = useContext(SubEventContext);

	const setParentId = subEventCtx.setParentId;

	const id = props.id;

	let importedClasses = `${classes['sub-event-button']}`;

	if (props.subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const parentIdHandler = async () => {
		setParentId(id);
		console.log(eventCtx.tasks);
		console.log(subEventCtx.hierarchy);
		console.log(subEventCtx.selectedTask);
		console.log(subEventCtx.subEvents);
	};

	return (
		<button onClick={parentIdHandler} className={importedClasses}>
			{props.subEvents}
		</button>
	);
};

export default ExpandSubEvents;
