import React, { useContext } from 'react';

import SubEventViewColumnHeader from './SubEventViewColumnHeader';
import SubEventViewItem from './SubEventViewItem';

import classes from './SubEventView.module.css';
import EventContext from '../../store/event-context';

const SubEventView = (props) => {
	const eventCtx = useContext(EventContext);

	const items = eventCtx.subEvents;

	return (
		<ul className={classes['sub-event-view']}>
			<h3 className={classes['sub-event-header']}>Event Details</h3>
			<SubEventViewColumnHeader />
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
		</ul>
	);
};

export default React.memo(SubEventView);
