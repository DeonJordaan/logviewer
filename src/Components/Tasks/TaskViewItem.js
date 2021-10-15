import React from 'react';

import ExpandEvents from '../Tasks/ExpandEvents';
import TaskTime from './TaskTime';

import classes from './TaskViewItem.module.css';

const TaskViewItem = (props) => {
	// const status = props.status;

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
			<td className={classesMap[props.status]}>{props.status}</td>
			<td>{props.taskCode}</td>
			<td>
				<TaskTime time={props.startTime} />
			</td>
			<td>
				<TaskTime time={props.endTime} />
			</td>
			<td>
				<ExpandEvents id={props.id} subEvents={props.subEvents} />
			</td>
			<td>{props.id}</td>
			<td>{props.message}</td>
		</tr>
	);
};

export default React.memo(TaskViewItem);
