import React, { useContext } from 'react';

import SubEventContext from '../../store/sub-event-context';
import SubEventViewHeader from './SubEventViewHeader';
import SubEventViewItem from './SubEventViewItem';
import classes from './SubEventView.module.css';

const SubEventView: React.FC<{
	setStatus: (statusCode: number) => string;
}> = (props) => {
	const subEventCtx = useContext(SubEventContext);

	let subEventContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (subEventCtx.subEvents) {
		subEventContent = (
			<tbody>
				{subEventCtx.subEvents.map((task) => (
					<SubEventViewItem
						key={task.key}
						status={props.setStatus(task.status)}
						subEvents={task.subEvents}
						startTime={task.startTime}
						endTime={task.endTime}
						id={task.id}
						message={task.message}
						//FIXME See LVerror01 doc
						host={task.host}
						app={task.App}
						taskCode={task.taskCode}
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

export default SubEventView;
