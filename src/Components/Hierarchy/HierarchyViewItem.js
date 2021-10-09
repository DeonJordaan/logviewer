import React, { useContext } from 'react';

import SubEventContext from '../../store/sub-event-context';

import ExpandSubEvents from '../SubEvents/ExpandSubEvents';
import TaskTime from '../Tasks/TaskTime';

import classes from './HierarchyViewItem.module.css';

const HierarchyViewItem = (props) => {
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

	const classesMap = {
		NotSet: classes.NotSet,
		Started: classes.Started,
		Completed: classes.Completed,
		Aborted: classes.Aborted,
		Failed: classes.Failed,
	};

	return (
		<tr className={classes['hierarchy-item']}>
			<td className={classesMap[props.status]}>{props.status}</td>
			{/* <div>status</div> */}
			<ExpandSubEvents subEvents={props.subEvents} />
			{/* <div>{subEvents}</div> */}
			{/* <div>subEvents</div> */}
			<TaskTime time={props.startTime} />
			{/* <div>startTime</div> */}
			{/* <div>{startTime}</div> */}
			<TaskTime time={props.endTime} />
			{/* <div>endTime</div> */}
			{/* <div>{endTime}</div> */}
			{/* <div>message</div> */}
			<td>{props.message}</td>
		</tr>
	);
};

export default React.memo(HierarchyViewItem);
