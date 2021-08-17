import ExpandSubEvents from '../SubEvents/ExpandSubEvents';
import TaskTime from './TaskTime';
import './TaskViewItem.css';

const TaskViewItem = (props) => {
	return (
		// <li className="task-item" onClick={getSubEvents}>
		<li className="task-item" onClick={props.getSubEvents}>
			<div className="task host">{props.host}</div>
			{/* <div className="task id">{props.id}</div> */}
			<div className="app">{props.app}</div>
			<div className="code">{props.taskCode}</div>
			<TaskTime time={props.startTime} />
			{/* <div className="start-time">{props.startTime}</div> */}
			<div className="end-time">{props.endTime}</div>
			<ExpandSubEvents
				className="sub-events"
				subEvents={props.subEvents}
			/>
			<div className="id">{props.id}</div>
			<div className="message">{props.message}</div>
		</li>
	);
};

export default TaskViewItem;
