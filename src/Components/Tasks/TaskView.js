import React, { useContext } from 'react';

import EventContext from '../../Context/event-context';

import TaskViewItem from './TaskViewItem';
import TaskViewHeader from './TaskViewHeader';

import classes from './TaskView.module.css';
import EventContext from '../../store/event-context';

const TaskView = (props) => {
	const eventCtx = useContext(EventContext);

	// console.log('TASKVIEW');
	return (
		<table className={classes['task-view']}>
			<thead>
				<TaskViewHeader />
			</thead>
			<tbody>
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
			</tbody>
		</table>
	);
};

export default React.memo(TaskView);
