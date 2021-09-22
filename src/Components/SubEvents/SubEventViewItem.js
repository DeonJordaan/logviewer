// import { useContext } from 'react';
// import EventContext from '../../Context/event-context';
import React from 'react';
import TaskTime from '../Tasks/TaskTime';
import ExpandSubEvents from './ExpandSubEvents';

import classes from './SubEventViewItem.module.css';

const SubEventViewItem = (props) => {
	//Extract status in order to set className. Classes are identical to status description.
	// const eventCtx = useContext(EventContext);

	const status = props.status;

	const classesMap = {
		NotSet: classes.NotSet,
		Started: classes.Started,
		Completed: classes.Completed,
		Aborted: classes.Aborted,
		Failed: classes.Failed,
	};

	return (
		<li className={classes['sub-event-item']}>
			<div className={classesMap[status]}>{props.status}</div>
			<ExpandSubEvents
				id={props.id}
				subEvents={props.subEvents}
				// onGetSubEvents={props.getSubEvents}
			/>
			<TaskTime time={props.startTime} />
			<TaskTime time={props.endTime} />
			<div className="id">{props.id}</div>
			<div className="message">{props.message}</div>
		</li>
	);
};

export default SubEventViewItem;
