import React, { useContext } from 'react';

import EventContext from '../../Context/event-context';

import TaskViewItem from './TaskViewItem';
import TaskViewHeader from './TaskViewHeader';

import classes from './TaskView.module.css';

const TaskView = (props) => {
	const eventCtx = useContext(EventContext);

	console.log('TASKVIEW');
	return (
		<ul className={classes['task-view']}>
			<TaskViewHeader />
			{eventCtx.tasks.map((task) => (
				<TaskViewItem
					key={task.key}
					host={task.host}
					id={task.id}
					app={task.App}
					subEvents={task.subEvents}
					taskCode={task.taskCode}
					startTime={task.startTime}
					endTime={task.endTime}
					message={task.message}
					status={props.setStatus(task.status)}
				/>
			))}
		</ul>
	);
};

export default React.memo(TaskView);
