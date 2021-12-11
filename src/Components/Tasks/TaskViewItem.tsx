import React from 'react';

import ExpandEvents from './ExpandEvents';
import TaskTime from './TaskTime';

import classes from './TaskViewItem.module.css';

const TaskViewItem: React.FC<{
	host: string;
	app: string;
	taskCode: string;
	subEvents: number;
	status: string;
	startTime: string;
	endTime: string;
	id: number;
	message: string;
}> = (props) => {
	function setClasses(taskStatus: string) {
		let taskClass = '';
		switch (taskStatus) {
			case 'NotSet': {
				taskClass = 'classes.NotSet';
				break;
			}
			case 'Started': {
				taskClass = 'classes.Started';
				break;
			}
			case 'Completed': {
				taskClass = 'classes.Completed';
				break;
			}
			case 'Aborted': {
				taskClass = 'classes.Aborted';
				break;
			}
			case 'Failed': {
				taskClass = 'classes.Failed';
				break;
			}
		}
		return taskClass;
	}

	return (
		<tr className={classes['task-item']}>
			<td>{props.host}</td>
			<td>{props.app}</td>
			<td className={setClasses(props.status)}>{props.status}</td>
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

//NOTE Mapping classes - cannot resolve type settings
// const classesMap = {
// 	NotSet: classes.NotSet,
// 	Started: classes.Started,
// 	Completed: classes.Completed,
// 	Aborted: classes.Aborted,
// 	Failed: classes.Failed,
// };
