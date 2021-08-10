import './TaskView.css';

import TaskViewItem from './TaskViewItem';
import TaskViewHeader from './TaskViewHeader';

const TaskView = (props) => {
	return (
		<ul className="task-view">
			<TaskViewHeader headers={props.taskItems} />
			{props.taskItems.map((task) => (
				<TaskViewItem
					host={task.host}
					id={task.id}
					app={task.App}
					subEvents={task.subEvents}
					taskCode={task.taskCode}
					startTime={task.startTime}
					endTime={task.endTime}
					message={task.message}
				/>
			))}
		</ul>
	);
};

export default TaskView;
