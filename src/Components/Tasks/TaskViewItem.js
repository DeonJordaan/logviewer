import React from 'react';

import ExpandSubEvents from '../SubEvents/ExpandSubEvents';
import TaskTime from './TaskTime';

import classes from './TaskViewItem.module.css';

const TaskViewItem = (props) => {
	const status = props.status;

	const classesMap = {
		NotSet: classes.NotSet,
		Started: classes.Started,
		Completed: classes.Completed,
		Aborted: classes.Aborted,
		Failed: classes.Failed,
	};

	return (
		<tr className={classes['task-item']}>
			<td>{props.host}</td>
			<td>{props.app}</td>
			<td className={classesMap[status]}>{props.status}</td>
			<td>{props.taskCode}</td>
			<td>
				<TaskTime time={props.startTime} />
			</td>
			<td>
				<TaskTime time={props.endTime} />
			</td>
			<td>
				<ExpandSubEvents id={props.id} subEvents={props.subEvents} />
			</td>
			<td>{props.id}</td>
			<td>{props.message}</td>
		</tr>
	);
};

export default React.memo(TaskViewItem);
