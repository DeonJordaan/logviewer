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
		<li className={classes['task-item']}>
			<div className={'host'}>{props.host}</div>
			<div className={'app'}>{props.app}</div>
			<div className={classesMap[status]}>{props.status}</div>
			<div className={'code'}>{props.taskCode}</div>
			<TaskTime time={props.startTime} />
			<TaskTime time={props.endTime} />
			<ExpandSubEvents id={props.id} subEvents={props.subEvents} />
			<div className={'id'}>{props.id}</div>
			<div className={'message'}>{props.message}</div>
		</li>
	);
};

export default React.memo(TaskViewItem);
