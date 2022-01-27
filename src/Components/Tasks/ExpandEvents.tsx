import React, { useContext, useEffect } from 'react';

import classes from './ExpandEvents.module.css';

import EventContext from '../../store/event-context';
import SubEventContext from '../../store/sub-event-context';

const ExpandEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	// Extract contexts
	const eventCtx = useContext(EventContext);
	const subEventCtx = useContext(SubEventContext);
	// Extract state setters
	const setParentId = subEventCtx.setParentId;
	const setSelectedTask = subEventCtx.setSelectedTask;
	const setHierarchy = subEventCtx.setHierarchy;

	const id = props.id;
	let subEvents = props.subEvents;

	let importedClasses = `${classes['sub-event-button']}`;
	if (subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const clickHandler = () => {
		setParentId(id);
		setHierarchy([]);
	};

	useEffect(() => {
		setSelectedTask(
			eventCtx.tasks.filter((task) => task.id === subEventCtx.parentId)
		);
	}, [eventCtx.tasks, setSelectedTask, subEventCtx.parentId]);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEvents}
		</button>
	);
};

export default ExpandEvents;
