import React from 'react';

import TaskTime from '../Tasks/TaskTime';

import classes from './HierarchyViewItem.module.css';

const HierarchyViewItem: React.FC<{
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
		<tr className={classes['hierarchy-item']}>
			<td>
				<button>Remove</button>
			</td>
			<td className={setClasses(props.status)}>{props.status}</td>
			<td>{props.subEvents}</td>
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

export default React.memo(HierarchyViewItem);

//NOTE Mapping classes - cannot resolve type settings
// const classesMap = {
// 	NotSet: classes.NotSet,
// 	Started: classes.Started,
// 	Completed: classes.Completed,
// 	Aborted: classes.Aborted,
// 	Failed: classes.Failed,
// };

//NOTE
// const subEventCtx = useContext(SubEventContext);
// console.log(subEventCtx);

// let status = '-';
// let subEvents = '0';
// let startTime = '0000-00-00T00:00:00.00';
// let endTime = '0000-00-00T00:00:00.00';
// let message = '-';

// if (subEventCtx.hierarchy.length > 0) {
// 	status = props.setStatus(subEventCtx.hierarchy[0].status);
// 	subEvents = subEventCtx.hierarchy[0].subEvents;
// 	startTime = subEventCtx.hierarchy[0].startTime;
// 	endTime = subEventCtx.hierarchy[0].endTime;
// 	message = subEventCtx.hierarchy[0].message;
// }
