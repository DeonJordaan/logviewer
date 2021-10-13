import React, { useContext } from 'react';

import SubEventContext from '../../store/sub-event-context';

import SubEventViewHeader from './SubEventViewHeader';
import SubEventViewItem from './SubEventViewItem';

import classes from './SubEventView.module.css';

const SubEventView = (props) => {
	const subEventCtx = useContext(SubEventContext);

	const items = subEventCtx.subEvents;

	let subEventContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (subEventCtx.subEvents.length > 0) {
		subEventContent = (
			<tbody>
				{items.map((task) => (
					<SubEventViewItem
						key={task.key}
						status={props.setStatus(task.status)}
						subEvents={task.subEvents}
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
		subEventContent = (
			<tbody>
				<tr>
					<td>{subEventCtx.error}</td>
				</tr>
			</tbody>
		);
	}

	if (subEventCtx.isLoading) {
		subEventContent = (
			<tbody>
				<tr>
					<td>Loading...</td>
				</tr>
			</tbody>
		);
	}

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

export default React.memo(SubEventView);
