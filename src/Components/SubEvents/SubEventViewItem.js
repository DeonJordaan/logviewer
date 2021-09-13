import TaskTime from '../Tasks/TaskTime';
import ExpandSubEvents from './ExpandSubEvents';

import classes from './SubEventViewItem.module.css';

const SubEventViewItem = (props) => {
	//Combine status classname with the status to define what style class should be applied. CSS classes are identical to status description
	const status = props.status;

	const statusClass = () => {
		const statusThing = {
			'Not-Set': classes['Not-Set'],
			Started: classes.Started,
			Completed: classes.Completed,
			Aborted: classes.Aborted,
			Failed: classes.Failed,
		};
		return classes[statusCode];
	};

	return (
		<li className={classes['sub-event-item']}>
			<div className={statusClass}>{props.status}</div>
			{/* <div className={statusClass}>{props.status}</div> */}
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

// NOTE EXAMPLE className={`${styles.description} ${styles.yellow}`}

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

//NOTE ANOTHER TRY
// let statusClass = '';

// if (status === 'Aborted') {
// 	statusClass = 'classes.Aborted';
// } else if (status === 'Completed') {
// 	statusClass = 'classes.Completed';
// }

//note ANOTHER
// const classHandler = () => {
// 	if (props.status === 'Aborted') {
// 		return classes.Aborted;
// 	} else if (props.status === 'Completed') {
// 		return classes.Completed;
// 	}
// 	return;
// };

// const statusClass = classes. + props.status;
