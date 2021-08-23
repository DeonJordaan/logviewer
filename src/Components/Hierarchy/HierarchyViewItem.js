import './HierarchyViewItem.css';
import TaskTime from '../Tasks/TaskTime';

const HierarchyViewItem = (props) => {
	// const status = props.eventDetails.status;
	// const subEvents = props.eventDetails.subEvents;
	// const startTime = props.eventDetails.startTime;
	// const endTime = props.eventDetails.endTime;
	// const message = props.eventDetails.message;

	return (
		<div className="hierarchy-item">
			<div>{props.eventDetails.status}</div>
			<div>{props.eventDetails.subEvents}</div>
			{/* <TaskTime time={props.eventDetails.startTime} /> */}
			{/* <TaskTime time={props.eventDetails.endTime} /> */}
			<div>{props.eventDetails.message}</div>
		</div>
	);
};

export default HierarchyViewItem;
