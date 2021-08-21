import './SubEventView.css';

import SubEventViewColumnHeader from './SubEventViewColumnHeader';
import SubEventViewItem from './SubEventViewItem';

const SubEventView = (props) => {
	return (
		<ul className="sub-event-view">
			<h3 className="sub-event-header">Event Details</h3>
			<SubEventViewColumnHeader headers={props.taskItems} />
			{props.subEventItems.map((task) => (
				<SubEventViewItem
					status={task.status}
					subEvents={task.subEvents}
					startTime={task.startTime}
					endTime={task.endTime}
					message={task.message}
				/>
			))}
		</ul>
	);
};

export default SubEventView;
