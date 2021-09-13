import ExpandSubEvents from '../SubEvents/ExpandSubEvents';
import TaskTime from './TaskTime';

import classes from './TaskViewItem.module.css';

const TaskViewItem = (props) => {
	// const combinedClasses = `${classes.status} ` + props.status;

	//TODO PERHAPS I'M DOING THIS CLASSES THING ALL WRONG...? MUST THEY BE DECALRED WITH 'classes.whatever' ALL THE TIME...?

	return (
		<li className={classes['task-item']}>
			<div className={classes.host}>{props.host}</div>
			<div className={classes.app}>{props.app}</div>
			<div className={classes.Aborted}>{props.status}</div>
			{/* <div className={props.status}>{props.status}</div> */}
			{/* <div className={combinedClasses}>{props.status}</div> */}
			<div className={classes.code}>{props.taskCode}</div>
			<TaskTime time={props.startTime} />
			<TaskTime time={props.endTime} />
			<ExpandSubEvents
				id={props.id}
				subEvents={props.subEvents}
				onGetSubEvents={props.getSubEvents}
			/>
			<div className={classes.id}>{props.id}</div>
			<div className={classes.message}>{props.message}</div>
		</li>
	);
};

export default TaskViewItem;
