import './ExpandSubEvents.css';

const ExpandSubEvents = (props) => {
	let classes = 'sub-event-button';

	if (props.subEvents === 0) {
		classes = 'no-sub-events';
	}

	// console.log(props.subEvents);

	return (
		<button onClick={props.onGetSubEvents} className={classes}>
			{props.subEvents}
		</button>
	);
};

export default ExpandSubEvents;
