import React, { useContext } from 'react';

import SubEventContext from '../../store/sub-event-context';

import classes from './HierarchyViewMainItem.module.css';

import TaskTime from '../Tasks/TaskTime';

const HierarchyViewMainItem = (props) => {
	const subEventCtx = useContext(SubEventContext);

	let hierarchyViewMainItemContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (subEventCtx.selectedTask) {
		console.log(subEventCtx.selectedTask);
		console.log(subEventCtx.selectedSubEvent);
		hierarchyViewMainItemContent = (
			<tbody>
				{subEventCtx.selectedTask.map((task) => (
					<tr className={classes['hierarchy-main-item']}>
						<td>{props.setStatus(task.status)}</td>
						<td>{task.subEvents}</td>
						<td>
							<TaskTime time={task.startTime} />
						</td>
						<td>
							<TaskTime time={task.endTime} />
						</td>
						<td>{task.id}</td>
						<td>{task.message}</td>
					</tr>
				))}
			</tbody>
		);
	}

	if (subEventCtx.error) {
		hierarchyViewMainItemContent = (
			<tbody>
				<tr>
					<td>{subEventCtx.error}</td>
				</tr>
			</tbody>
		);
	}

	if (subEventCtx.isLoading) {
		hierarchyViewMainItemContent = (
			<tbody>
				<tr>
					<td>Loading...</td>
				</tr>
			</tbody>
		);
	}

	return <>{hierarchyViewMainItemContent}</>;
};

export default HierarchyViewMainItem;

// <tbody>
// 	<tr>
// 		<td>{selectedTask.status}</td>
// 		<td>{selectedTask.subEvents}</td>
// 		<td>
// 			<TaskTime time={selectedTask.startTime} />
// 		</td>
// 		<td>
// 			<TaskTime time={selectedTask.endTime} />
// 		</td>
// 		<td>{selectedTask.id}</td>
// 		<td>{selectedTask.message}</td>
// 	</tr>
// </tbody>
