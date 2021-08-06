import './TaskView.css';

import TaskViewItem from './TaskViewItem';

const TaskView = (props) => {
	return (
		<ul className="task-view">
			{props.taskItems.map((task) => (
				<TaskViewItem
					id={task.id}
					app={task.App}
					taskCode={task.taskCode}
					startTime={task.startTime}
					endTime={task.endTime}
					subEvents={task.subEvents}
				/>
			))}
		</ul>
	);
};

export default TaskView;
