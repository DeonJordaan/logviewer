import './TaskViewItem.css';

const TaskViewItem = (props) => {
	return (
		<li>
			<div className="task-item">{props.taskItem}</div>
		</li>
	);
};

export default TaskViewItem;
