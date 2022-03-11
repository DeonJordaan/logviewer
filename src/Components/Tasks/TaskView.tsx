import React from 'react';
import { useSelector } from 'react-redux';

import TaskViewHeader from './TaskViewHeader';
import TaskViewItem from './TaskViewItem';
import classes from './TaskView.module.css';

// import { doc, setDoc } from 'firebase/firestore';
// import db from '../../store/firebase';

const TaskView: React.FC<{
	setStatus: (statusCode: number) => string;
}> = (props) => {
	// const events = useSelector((state) => state.events);
	const displayData = useSelector((state) => state.displayData);

	let taskContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (displayData) {
		taskContent = (
			<tbody>
				{displayData.map((task) => (
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

	// if (eventCtx.error) {
	// 	taskContent = (
	// 		<tbody>
	// 			<tr>
	// 				<td>{eventCtx.error}</td>
	// 			</tr>
	// 		</tbody>
	// 	);
	// }

	// if (eventCtx.isLoading) {
	// 	taskContent = (
	// 		<tbody>
	// 			<tr>
	// 				<td>Loading...</td>
	// 			</tr>
	// 		</tbody>
	// 	);
	// }

	// const eventStore = doc(db, 'events/{data.id}');
	// const fbData: {
	// 	key: data.id;
	// 	id: data.id;
	// 	App: data.App;
	// 	taskCode: data.taskCode;
	// 	startTime: data.startTime;
	// 	endTime: data.endTime;
	// 	subEvents: data.subEvents;
	// 	host: data.host;
	// 	message: data.message;
	// 	status: data.status;
	// } = [];
	// const fbase = () => {
	// 	fbData.push(
	// 		eventCtx.tasks.map((data) => {
	// 			return {
	// 				key: data.id,
	// 				id: data.id,
	// 				App: data.App,
	// 				taskCode: data.taskCode,
	// 				startTime: data.startTime,
	// 				endTime: data.endTime,
	// 				subEvents: data.subEvents,
	// 				host: data.host,
	// 				message: data.message,
	// 				status: data.status,
	// 			};
	// 		})
	// 	);
	// };
	// fbase();

	// const writeEvents = () => {
	// 	setDoc(eventStore, fbData);
	// };
	// writeEvents();

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
