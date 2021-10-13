import React from 'react';

// import { useContext } from 'react';
// import EventContext from '../../Context/event-context';

import TaskTime from '../Tasks/TaskTime';
import ExpandSubEvents from './ExpandSubEvents';

import classes from './SubEventViewItem.module.css';

const SubEventViewItem = (props) => {
	//Extract status in order to set className. Classes are identical to status description.
	const status = props.status;

	const classesMap = {
		NotSet: classes.NotSet,
		Started: classes.Started,
		Completed: classes.Completed,
		Aborted: classes.Aborted,
		Failed: classes.Failed,
	};

	return (
		<tr className={classes['sub-event-item']}>
			<td className={classesMap[status]}>{props.status}</td>
			<td>
				<ExpandSubEvents id={props.id} subEvents={props.subEvents} />
			</td>
			<td>
				<TaskTime time={props.startTime} />
			</td>
			<td>
				<TaskTime time={props.endTime} />
			</td>
			<td>{props.id}</td>
			<td>{props.message}</td>
		</tr>
	);
};

export default SubEventViewItem;
