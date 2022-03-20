import React from 'react';
import classes from './HierarchyViewMainItem.module.css';
import TaskTime from '../Tasks/TaskTime';
import { useAppSelector } from '../../store/hooks';

const HierarchyViewMainItem: React.FC<{
	setStatus: (statusCode: number) => string;
}> = (props) => {
	const { selectedTask } = useAppSelector((state) => state.subEvents);

	let hierarchyViewMainItemContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (selectedTask) {
		hierarchyViewMainItemContent = (
			<tbody>
				{selectedTask.map((task) => (
					<tr
						key={task.key}
						className={classes['hierarchy-main-item']}
					>
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

	// TODO IMPLEMENT ERROR HANDLING STATES
	// if (subEventCtx.error) {
	// 	hierarchyViewMainItemContent = (
	// 		<tbody>
	// 			<tr>
	// 				<td>{subEventCtx.error}</td>
	// 			</tr>
	// 		</tbody>
	// 	);
	// }

	// if (subEventCtx.isLoading) {
	// 	hierarchyViewMainItemContent = (
	// 		<tbody>
	// 			<tr>
	// 				<td>Loading...</td>
	// 			</tr>
	// 		</tbody>
	// 	);
	// }

	return <>{hierarchyViewMainItemContent}</>;
};

export default HierarchyViewMainItem;
