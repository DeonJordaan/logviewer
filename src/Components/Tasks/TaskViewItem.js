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
			<td className={'host'}>{props.host}</td>
			<td className={'app'}>{props.app}</td>
			<td className={classesMap[status]}>{props.status}</td>
			<td className={'code'}>{props.taskCode}</td>
			<TaskTime time={props.startTime} />
			<TaskTime time={props.endTime} />
			<td>
				<ExpandSubEvents id={props.id} subEvents={props.subEvents} />
			</td>
			<td className={'id'}>{props.id}</td>
			<td className={'message'}>{props.message}</td>
		</tr>
	);
};

export default React.memo(TaskViewItem);
