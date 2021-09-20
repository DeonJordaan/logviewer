import { useEffect, useContext } from 'react';
import EventContext from '../../Context/event-context';
// import TaskTime from '../Tasks/TaskTime';

import classes from './HierarchyViewItem.module.css';

const HierarchyViewItem = (props) => {
	// const status = props.setStatus(props.eventDetails.status);
	// const subEvents = props.eventDetails.subEvents;
	// const startTime = props.eventDetails.startTime;
	// const endTime = props.eventDetails.endTime;
	// const message = props.eventDetails.message;

	const eventCtx = useContext(EventContext);
	const setHierarchyHere = eventCtx.setHierarchy;

	const selectedTask = eventCtx.tasks.filter(
		(task) => task.id === parseInt(eventCtx.parentId)
	);
	console.log(selectedTask);

	//FIXME THIS IS CAUSING AN INFINITE LOOP, BUT I AM GETTING THE REQUIRED EVENT DATA FOR THE HIERARCHYVIEW....WORK TO DO, THEN!
	useEffect(
		() => setHierarchyHere(selectedTask),
		[setHierarchyHere, selectedTask]
	);

	return (
		<div className={classes['hierarchy-item']}>
			{/* <div>{status}</div> */}
			<div>status</div>
			{/* <div>{subEvents}</div> */}
			<div>subEvents</div>
			{/* <TaskTime time={startTime} /> */}
			<div>startTime</div>
			{/* <TaskTime time={endTime} /> */}
			<div>endTime</div>
			<div>message</div>
		</div>
	);
};

export default HierarchyViewItem;
