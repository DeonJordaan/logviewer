import SubEventViewColumnHeader from './SubEventViewColumnHeader';
import SubEventViewItem from './SubEventViewItem';

import classes from './SubEventView.module.css';

const SubEventView = (props) => {
	const items = props.subEventItems;

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
					// getSubEvents={props.onGetSubEvents}
				/>
			))}
		</ul>
	);
};

export default SubEventView;
