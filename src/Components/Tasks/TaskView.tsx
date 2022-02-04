import React, { useContext } from 'react';

import EventContext from '../../store/event-context';
import TaskViewHeader from './TaskViewHeader';
import TaskViewItem from './TaskViewItem';
import classes from './TaskView.module.css';

const TaskView: React.FC<{
	setStatus: (statusCode: number) => string;
}> = (props) => {
	const eventCtx = useContext(EventContext);

	let taskContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (eventCtx.tasks) {
		taskContent = (
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
		);
	}

	if (eventCtx.error) {
		taskContent = (
			<tbody>
				<tr>
					<td>{eventCtx.error}</td>
				</tr>
			</tbody>
		);
	}

	if (eventCtx.isLoading) {
		taskContent = (
			<tbody>
				<tr>
					<td>Loading...</td>
				</tr>
			</tbody>
		);
	}

	return (
		<div className={classes['task-view']}>
			<h3 className={classes['task-header']}>Event Data</h3>
			<table>
				<thead>
					<TaskViewHeader />
				</thead>
				<>{taskContent}</>
			</table>
		</div>
	);
};

export default React.memo(TaskView);
