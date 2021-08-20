import ExpandSubEvents from './ExpandSubEvents';
import TaskTime from '../Tasks/TaskTime';
import './SubEventViewItem.css';

const TaskViewItem = (props) => {
	return (
		<li className="task-item" onClick={props.getSubEvents}>
			<div className="task host">{props.host}</div>
			{/* <div className="task id">{props.id}</div> */}
			<div className="task app">{props.app}</div>
			<div className="task code">{props.taskCode}</div>
			<TaskTime className="task" time={props.startTime} />
			<TaskTime className="task" time={props.endTime} />
			<ExpandSubEvents
				className="sub-events"
				subEvents={props.subEvents}
			/>
			<div className="task id">{props.id}</div>
			<div className="task message">{props.message}</div>
		</li>
	);
};

export default TaskViewItem;
