import './TaskViewItem.css';

const TaskViewItem = (props) => {
	return (
		// <li className="task-item" onClick={getSubEvents}>
		<li className="task-item">
			<div className="task host">{props.host}</div>
			<div className="task id">{props.id}</div>
			<div className="task app">{props.app}</div>
			<div className="task code">{props.taskCode}</div>
			<div className="task start-time">{props.startTime}</div>
			<div className="task end-time">{props.endTime}</div>
			<div className="task sub-events">{props.subEvents}</div>
			<div className="task message">{props.message}</div>
		</li>
	);
};

export default TaskViewItem;
