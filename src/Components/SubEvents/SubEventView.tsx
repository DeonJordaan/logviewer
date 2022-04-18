import React, { useEffect } from 'react';

import SubEventViewHeader from './SubEventViewHeader';
import SubEventViewItem from './SubEventViewItem';
import classes from './SubEventView.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSubEventData } from '../../store/subevent-slice';

const SubEventView: React.FC<{
	setStatus: (statusCode: number) => string;
}> = (props) => {
	const dispatch = useAppDispatch();

	const { subEvents, fetchId } = useAppSelector((state) => state.subEvents);

	useEffect(() => {
		dispatch(fetchSubEventData(fetchId));
	}, [dispatch, fetchId]);

	let subEventContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (subEvents.length > 0) {
		subEventContent = (
			<tbody>
				{subEvents.map((task) => (
					<SubEventViewItem
						key={task.Key}
						status={props.setStatus(+task.StatusId)}
						subEvents={task.EventCount}
						startTime={task.StartTime}
						endTime={task.EndTime}
						id={task.Id}
						message={task.Message}
						host={task.Host}
						app={task.AppName}
						taskCode={task.EventName}
					/>
				))}
			</tbody>
		);
	}

	// TODO IMPLEMENT ERROR HANDLING STATES
	// if (subEventCtx.error) {
	// 	subEventContent = (
	// 		<tbody>
	// 			<tr>
	// 				<td>{subEventCtx.error}</td>
	// 			</tr>
	// 		</tbody>
	// 	);
	// }

	// if (subEventCtx.isLoading) {
	// 	subEventContent = (
	// 		<tbody>
	// 			<tr>
	// 				<td>Loading...</td>
	// 			</tr>
	// 		</tbody>
	// 	);
	// }

	return (
		<div className={classes['sub-event-view']}>
			<h3 className={classes['sub-event-header']}>Event Details</h3>
			<table>
				<thead>
					<SubEventViewHeader />
				</thead>
				<>{subEventContent}</>
			</table>
		</div>
	);
};

export default SubEventView;
