import React, { useContext } from 'react';

import EventContext from '../../Context/event-context';

import ExpandSubEvents from '../SubEvents/ExpandSubEvents';
import TaskTime from '../Tasks/TaskTime';

import classes from './HierarchyViewItem.module.css';

const HierarchyViewItem = (props) => {
	const eventCtx = useContext(EventContext);
	console.log(eventCtx);

	let status = 'status';
	let subEvents = 'subEvents';
	let startTime = 'startTime';
	let endTime = 'endTime';
	let message = 'message';

	if (eventCtx.hierarchy.length > 0) {
		status = props.setStatus(eventCtx.hierarchy[0].status);
		subEvents = eventCtx.hierarchy[0].subEvents;
		startTime = eventCtx.hierarchy[0].startTime;
		endTime = eventCtx.hierarchy[0].endTime;
		message = eventCtx.hierarchy[0].message;
	}

	const classesMap = {
		NotSet: classes.NotSet,
		Started: classes.Started,
		Completed: classes.Completed,
		Aborted: classes.Aborted,
		Failed: classes.Failed,
	};

	return (
		<div className={classes['hierarchy-item']}>
			<div className={classesMap[status]}>{status}</div>
			{/* <div>status</div> */}
			<ExpandSubEvents subEvents={subEvents} />
			{/* <div>{subEvents}</div> */}
			{/* <div>subEvents</div> */}
			<TaskTime time={startTime} />
			{/* <div>startTime</div> */}
			{/* <div>{startTime}</div> */}
			<TaskTime time={endTime} />
			{/* <div>endTime</div> */}
			{/* <div>{endTime}</div> */}
			{/* <div>message</div> */}
			<div>{message}</div>
		</div>
	);
};

export default React.memo(HierarchyViewItem);
