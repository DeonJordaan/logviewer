import ExpandSubEvents from '../SubEvents/ExpandSubEvents';
import TaskTime from './TaskTime';
import './TaskViewItem.css';

const TaskViewItem = (props) => {
	const classes = 'task status ' + props.status;

	return (
		<li className="task-item">
			<div className="task host">{props.host}</div>
			<div className="task app">{props.app}</div>
			<div className={classes}>{props.status}</div>
			<div className="task code">{props.taskCode}</div>
			<TaskTime className="task" time={props.startTime} />
			<TaskTime className="task" time={props.endTime} />
			{/* <div className="sub-event-div"> */}
			<ExpandSubEvents
				id={props.id}
				className="task"
				subEvents={props.subEvents}
				onGetSubEvents={props.getSubEvents}
			/>
			{/* </div> */}
			<div className="task id">{props.id}</div>
			<div className="task message">{props.message}</div>
		</li>
	);
};

export default TaskViewItem;
