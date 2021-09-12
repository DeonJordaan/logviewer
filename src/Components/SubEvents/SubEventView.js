import './SubEventView.css';

import SubEventViewColumnHeader from './SubEventViewColumnHeader';
import SubEventViewItem from './SubEventViewItem';

const SubEventView = (props) => {
	const items = props.subEventItems;

	return (
		<ul className="sub-event-view">
			<h3 className="sub-event-header">Event Details</h3>
			<SubEventViewColumnHeader headers={props.taskItems} />
			{items.map((task) => (
				<SubEventViewItem
					key={task.key}
					status={props.setStatus(task.status)}
					subEvents={task.subEvents}
					startTime={task.startTime}
					endTime={task.endTime}
					id={task.id}
					message={task.message}
					getSubEvents={props.onGetSubEvents}
				/>
			))}
		</ul>
	);
};

export default SubEventView;
