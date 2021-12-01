import React, { useContext, useEffect } from 'react';

import classes from './ExpandSubEvents.module.css';

// import EventContext from '../../store/event-context';
import SubEventContext from '../../store/sub-event-context';

const ExpandSubEvents = (props) => {
	// const eventCtx = useContext(EventContext);
	const subEventCtx = useContext(SubEventContext);

	const setSubEventParentId = subEventCtx.setSubEventParentId;

	const setSelectedSubEvent = subEventCtx.setSelectedSubEvent;

	const id = props.id;
	// console.log(id);

	let subEvents = props.subEvents;

	let importedClasses = `${classes['sub-event-button']}`;

	if (subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
		subEvents = '-';
	}

	const parentIdHandler = async () => {
		setSubEventParentId(id);
		// console.log(eventCtx.tasks);
		// console.log(subEventCtx.hierarchy);
		// console.log(subEventCtx.selectedTask);
		// console.log(subEventCtx.subEvents);
	};

	useEffect(() => {
		setSelectedSubEvent(
			subEventCtx.subEvents.filter(
				(subEvent) =>
					subEvent.id === parseInt(subEventCtx.subEventParentId)
			)
		);
	}, [
		setSelectedSubEvent,
		subEventCtx.subEventParentId,
		subEventCtx.subEvents,
	]);
	// useEffect(() => {
	// 	setHierarchy(
	// 		subEventCtx.subEvents.filter(
	// 			(task) => task.id === parseInt(subEventCtx.parentId)
	// 		)
	// 	);
	// }, []);

	return (
		<button onClick={parentIdHandler} className={importedClasses}>
			{subEvents}
		</button>
	);
};

export default ExpandSubEvents;
