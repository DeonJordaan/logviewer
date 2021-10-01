import React, { useContext } from 'react';

import classes from './ExpandSubEvents.module.css';

import EventContext from '../../store/event-context';

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

	// const setSelectedTaskFunction = async () => {
	// 	await parentIdHandler()
	// 	eventCtx.setSelectedTask(
	// 		eventCtx.tasks.filter(
	// 			(task) => task.id === parseInt(eventCtx.parentId)
	// 		)
	// 	);
	// }

	return (
		<button onClick={parentIdHandler} className={importedClasses}>
			{props.subEvents}
		</button>
	);
};

export default ExpandSubEvents;
