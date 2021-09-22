import React, { useMemo, useContext } from 'react';

import classes from './ExpandSubEvents.module.css';

import EventContext from '../../Context/event-context';

const ExpandSubEvents = (props) => {
	const eventCtx = useContext(EventContext);

	const setParentId = eventCtx.setParentId;

	const id = props.id;

	// console.log(eventCtx.parentId);
	// console.log(props.id);

	let importedClasses = `${classes['sub-event-button']}`;

	if (props.subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	// const onGetsubEvent = eventCtx.getSubEventData(props.id);

	const parentIdHandler = useMemo(() => {
		setParentId(id);
		// console.log(eventCtx.tasks);
		// console.log(eventCtx.hierarchy);
		// console.log(eventCtx.hierarchy[0]);
	}, [id, setParentId]);

	return (
		// <button onClick={onGetsubEvent} className={importedClasses}>
		<button onClick={parentIdHandler} className={importedClasses}>
			{props.subEvents}
		</button>
	);
};

export default ExpandSubEvents;
