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
		<li className={classes['sub-event-item']}>
			<div className={classesMap[status]}>{props.status}</div>
			<ExpandSubEvents
				id={props.id}
				subEvents={props.subEvents}
				onGetSubEvents={props.getSubEvents}
			/>
			<TaskTime time={props.startTime} />
			<TaskTime time={props.endTime} />
			<div className="id">{props.id}</div>
			<div className="message">{props.message}</div>
		</li>
	);
};

export default SubEventViewItem;

//NOTE Alternate return statement with more classNames
// return (
// 	<li className={classes['sub-event-item']}>
// 		<div className={combinedClasses}>{props.status}</div>
// 		<ExpandSubEvents
// 			id={props.id}
// 			className={classes['sub-events']}
// 			subEvents={props.subEvents}
// 			onGetSubEvents={props.getSubEvents}
// 		/>
// 		<TaskTime
// 			className={classes['sub-events']}
// 			time={props.startTime}
// 		/>
// 		<TaskTime className={classes['sub-events']} time={props.endTime} />
// 		<div className={`${classes['sub-events']} ${classes.id}`}>
// 			{props.id}
// 		</div>
// 		<div className={`${classes['sub-events']} ${classes.message}`}>
// 			{props.message}
// 		</div>
// 	</li>
// );
