import './SubEventView.css';

import TaskViewItem from '../Tasks/TaskViewItem';
import TaskViewHeader from '../Tasks/TaskViewHeader';

const SubEventView = (props) => {
	return (
		<ul className="task-view">
			<TaskViewHeader headers={props.taskItems} />
			{props.subEventItems.map((task) => (
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

export default SubEventView;
