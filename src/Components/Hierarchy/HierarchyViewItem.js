import React, { useEffect, useContext, useCallback } from 'react';

import EventContext from '../../Context/event-context';

// import ExpandSubEvents from '../SubEvents/ExpandSubEvents';
// import TaskTime from '../Tasks/TaskTime';

import classes from './HierarchyViewItem.module.css';

const HierarchyViewItem = (props) => {
	const eventCtx = useContext(EventContext);

	// const status = props.setStatus(eventCtx.hierarchy[0].status);
	// const subEvents = eventCtx.hierarchy[0].subEvents;
	// const startTime = eventCtx.hierarchy[0].startTime;
	// const endTime = eventCtx.hierarchy[0].endTime;
	// const message = eventCtx.hierarchy[0].message;

	const classesMap = {
		NotSet: classes.NotSet,
		Started: classes.Started,
		Completed: classes.Completed,
		Aborted: classes.Aborted,
		Failed: classes.Failed,
	};

	return (
		<div className={classes['hierarchy-item']}>
			{/* <div className={classesMap[status]}>{status}</div> */}
			<div>status</div>
			{/* <ExpandSubEvents subEvents={subEvents} /> */}
			{/* <div>{subEvents}</div> */}
			<div>subEvents</div>
			{/* <TaskTime time={startTime} /> */}
			<div>startTime</div>
			{/* <div>{startTime}</div> */}
			{/* <TaskTime time={endTime} /> */}
			<div>endTime</div>
			{/* <div>{endTime}</div> */}
			<div>message</div>
			{/* <div>{message}</div> */}
		</div>
	);
};

export default HierarchyViewItem;

//NOTE PREVIOUS ATTEMPTS TO GET HIERARCHY TO WORK
// const setHierarchyHere = eventCtx.setHierarchy;
// const parentIdHere = eventCtx.parentId;

// const selectedTask = useCallback(() => {
// 	eventCtx.tasks.filter(
// 		(task) => task.id === parseInt(eventCtx.parentId)
// 	);
// }, [eventCtx.tasks, eventCtx.parentId]);
// console.log(selectedTask());

//FIXME THIS IS CAUSING AN INFINITE LOOP, BUT I AM GETTING THE REQUIRED EVENT DATA FOR THE HIERARCHYVIEW....WORK TO DO, THEN!
// useEffect(
// 	() => {
// 		setHierarchyHere(selectedTask);
// 		console.log(eventCtx.hierarchy);
// 	},
// 	[setHierarchyHere, selectedTask]
// );
