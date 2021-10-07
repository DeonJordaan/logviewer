import React, { useContext } from 'react';

import SubEventContext from '../../store/event-context';

import ExpandSubEvents from '../SubEvents/ExpandSubEvents';
import TaskTime from '../Tasks/TaskTime';

import classes from './HierarchyViewItem.module.css';

const HierarchyViewItem = (props) => {
	const eventCtx = useContext(SubEventContext);
	// console.log(eventCtx);

	let status = '-';
	let subEvents = '0';
	let startTime = '0000-00-00T00:00:00.00';
	let endTime = '0000-00-00T00:00:00.00';
	let message = '-';

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
