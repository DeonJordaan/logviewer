import React, { useContext } from 'react';

import SubEventContext from '../../store/sub-event-context';

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
		hierarchyViewMainItemContent = (
			<tbody>
				{subEventCtx.selectedTask.map((task) => (
					<HierarchyViewMainItem
						key={task.key}
						subEvents={task.subEvents}
						status={task.status}
						startTime={task.startTime}
						endTime={task.endTime}
						id={task.id}
						message={task.message}
					/>
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
