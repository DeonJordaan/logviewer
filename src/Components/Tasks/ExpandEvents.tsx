import React, { useContext, useEffect } from 'react';

import classes from './ExpandEvents.module.css';
import SubEventContext from '../../store/sub-event-context';
import EventContext from '../../store/event-context';

const ExpandEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	// Extract contexts
	const eventCtx = useContext(EventContext);
	const subEventCtx = useContext(SubEventContext);
	const tasks = eventCtx.tasks;
	const parentId = subEventCtx.parentId;
	// Extract state setters
	const setParentId = subEventCtx.setParentId;
	const setFetchId = subEventCtx.setFetchId;
	const setSelectedTask = subEventCtx.setSelectedTask;
	// const setHierarchy = subEventCtx.setHierarchy;

	//FIXME Check where the hierarchy main item is being drawn from
	const id = props.id;

	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const clickHandler = () => {
		console.log(id);
		setParentId(id);
		setFetchId(id);
	};

	useEffect(() => {
		setSelectedTask(tasks.filter((task) => task.id === parentId));
	}, [tasks, setSelectedTask, parentId]);
	console.log(subEventCtx.selectedTask);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
};

export default ExpandEvents;
