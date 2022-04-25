import React from 'react';

import { useAppSelector } from '../../store/hooks';

import TaskTime from '../Tasks/TaskTime';

import classes from './HierarchyViewMainItem.module.css';

const HierarchyViewMainItem: React.FC<{
	setStatus: (statusCode: number) => string;
}> = (props) => {
	const { selectedEvent } = useAppSelector((state) => state.events);

	let hierarchyViewMainItemContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (selectedEvent) {
		hierarchyViewMainItemContent = (
			<tbody>
				{selectedEvent.map((task) => (
					<tr
						key={task.Key}
						className={classes['hierarchy-main-item']}
					>
						<td>Level</td>
						<td>{props.setStatus(+task.StatusId)}</td>
						<td>{task.EventCount}</td>
						<td>
							<TaskTime time={task.StartTime} />
						</td>
						<td>
							<TaskTime time={task.EndTime} />
						</td>
						<td>{task.Id}</td>
						<td>{task.Message}</td>
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
