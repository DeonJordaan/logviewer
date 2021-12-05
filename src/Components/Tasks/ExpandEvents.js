import React, { useContext, useEffect } from 'react';

import classes from './ExpandEvents.module.css';

import EventContext from '../../store/event-context';
import SubEventContext from '../../store/sub-event-context';

const ExpandEvents = (props) => {
	const eventCtx = useContext(EventContext);
	const subEventCtx = useContext(SubEventContext);

	const setParentId = subEventCtx.setParentId;

	const setSelectedTask = subEventCtx.setSelectedTask;

	const setHierarchy = subEventCtx.setHierarchy;

	// const id = this.id;
	const id = props.id;
	// console.log(id);

	let subEvents = props.subEvents;

	let importedClasses = `${classes['sub-event-button']}`;

	if (subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
		subEvents = '-';
	}

	const clickHandler = async (event) => {
		console.log(event);
		setParentId(id);
		setHierarchy([]);
		// console.log(eventCtx.tasks);
		// console.log(subEventCtx.hierarchy);
		// console.log(subEventCtx.selectedTask);
		// console.log(subEventCtx.subEvents);
	};

	useEffect(() => {
		setSelectedTask(
			eventCtx.tasks.filter(
				(task) => task.id === parseInt(subEventCtx.parentId)
			)
		);
	}, [eventCtx.tasks, setSelectedTask, subEventCtx.parentId]);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEvents}
		</button>
	);
};

export default ExpandEvents;
