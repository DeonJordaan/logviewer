import './HierarchyViewItem.css';

const HierarchyViewItem = (props) => {
	const status = props.eventDetails.status;
	const subEvents = props.eventDetails.subEvents;
	const startTime = props.eventDetails.startTime;
	const endTime = props.eventDetails.endTime;
	const message = props.eventDetails.message;

	return (
		<div className="hierarchy-item">
			<div>{status}</div>
			<div>{subEvents}</div>
			<div>{startTime}</div>
			<div>{endTime}</div>
			<div>{message}</div>
		</div>
	);
};

export default HierarchyViewItem;
