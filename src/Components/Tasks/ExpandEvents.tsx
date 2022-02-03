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
	const setFetchId = subEventCtx.setFetchId;
	const setSelectedTask = subEventCtx.setSelectedTask;

	//FIXME Check where the hierarchy main item is being drawn from
	const setHierarchyHeader = subEventCtx.setHierarchy;

	const id = props.id;
	let subEvents = props.subEvents;

	let importedClasses = `${classes['sub-event-button']}`;
	if (subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const clickHandler = () => {
		setParentId(id);
		setFetchId(id);
		setHierarchyHeader([]);
	};

	useEffect(() => {
		setSelectedTask(
			eventCtx.tasks.filter((task) => task.id === subEventCtx.parentId)
		);
	}, [eventCtx.tasks, setSelectedTask, subEventCtx.parentId]);
	console.log(subEventCtx.selectedTask);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEvents}
		</button>
	);
};

export default ExpandEvents;
