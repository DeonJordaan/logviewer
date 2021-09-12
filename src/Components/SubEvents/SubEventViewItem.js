import TaskTime from '../Tasks/TaskTime';
import ExpandSubEvents from './ExpandSubEvents';
import './SubEventViewItem.css';

const SubEventViewItem = (props) => {
	const classes = 'sub-events status ' + props.status;

	return (
		<li className="sub-event-item">
			<div className={classes}>{props.status}</div>
			<ExpandSubEvents
				id={props.id}
				className="sub-events"
				subEvents={props.subEvents}
				onGetSubEvents={props.getSubEvents}
			/>
			<TaskTime className="sub-events" time={props.startTime} />
			<TaskTime className="sub-events" time={props.endTime} />
			<div className="sub-events id">{props.id}</div>
			<div className="sub-events message">{props.message}</div>
		</li>
	);
};

export default SubEventViewItem;
