import React, { useContext } from 'react';

import SubEventViewHeader from './SubEventViewHeader';
import SubEventViewItem from './SubEventViewItem';

import classes from './SubEventView.module.css';
import SubEventContext from '../../store/sub-event-context';

const SubEventView = (props) => {
	const subEventCtx = useContext(SubEventContext);

	const items = subEventCtx.subEvents;

	let subEventContent = <p>'No event selected'</p>;

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
		subEventContent = <p>{subEventCtx.error}</p>;
	}

	if (subEventCtx.isLoading) {
		subEventContent = <p>Loading...</p>;
	}

	return (
		<div className={classes['sub-event-view']}>
			<h3 className={classes['sub-event-header']}>Event Details</h3>
			<table>
				<thead>
					<SubEventViewHeader />
				</thead>
				<section>{subEventContent}</section>
				{/* <tbody>
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
				</tbody> */}
			</table>
		</div>
	);
};

export default React.memo(SubEventView);
