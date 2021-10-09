import React, { useContext } from 'react';

import TaskViewItem from './TaskViewItem';
import TaskViewHeader from './TaskViewHeader';

import classes from './TaskView.module.css';
import EventContext from '../../store/event-context';

const TaskView = (props) => {
	const eventCtx = useContext(EventContext);

	let taskContent = <p>'No data found'</p>;

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
		taskContent = <p>{eventCtx.error}</p>;
	}

	if (eventCtx.isLoading) {
		taskContent = <p>Loading...</p>;
	}

	// console.log('TASKVIEW');
	return (
		<div className={classes['task-view']}>
			<h3 className={classes['task-header']}>Event Data</h3>
			<table>
				<thead>
					<TaskViewHeader />
				</thead>
				<section>{taskContent}</section>
				{/* <tbody>
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
				</tbody> */}
			</table>
		</div>
	);
};

export default React.memo(TaskView);
