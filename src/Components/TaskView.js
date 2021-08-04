import './TaskView.css';

import TaskViewItem from './TaskViewItem';

const TaskView = (props) => {
	return (
		<ul className="task-view">
			{props.taskItems.map((task) => (
				<TaskViewItem taskItem={props.taskItems} />
			))}
		</ul>
	);

	// <ul className="task-view">{props.taskItems}</ul>;
};

export default TaskView;

// props.taskItem.map((task) => task.taskData);
