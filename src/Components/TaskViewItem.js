import './TaskViewItem.css';

const TaskViewItem = (props) => {
	return (
		<li className="task-item">
			<div>{props.id}</div>
			<div>{props.app}</div>
			<div>{props.taskCode}</div>
			<div>{props.startTime}</div>
			<div>{props.endTime}</div>
		</li>
	);
};

export default TaskViewItem;
