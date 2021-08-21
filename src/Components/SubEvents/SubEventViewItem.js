import TaskTime from '../Tasks/TaskTime';
import ExpandSubEvents from './ExpandSubEvents';
import './SubEventViewItem.css';

const TaskViewItem = (props) => {
	return (
		<li className="sub-event-item" onClick={props.getSubEvents}>
			<div className="sub-events status">{props.status}</div>
			<ExpandSubEvents
				className="sub-events"
				subEvents={props.subEvents}
				onGetSubEvents={props.getSubEvents}
			/>
			<TaskTime className="sub-events" time={props.startTime} />
			<TaskTime className="sub-events" time={props.endTime} />
			<div className="sub-events message">{props.message}</div>
		</li>
	);
};

export default TaskViewItem;
