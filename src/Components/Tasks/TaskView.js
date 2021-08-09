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
