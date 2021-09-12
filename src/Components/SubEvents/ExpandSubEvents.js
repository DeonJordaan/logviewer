import './ExpandSubEvents.css';

const ExpandSubEvents = (props) => {
	let classes = 'sub-event-button';

	if (props.subEvents === 0) {
		classes = 'no-sub-events';
	}

	const findParentId = () => {
		console.log(props.id);
		props.onGetSubEvents(props.id);
	};
	// console.log(props.subEvents);

	return (
		// <div>
		<button onClick={findParentId} className={classes}>
			{props.subEvents}
		</button>
		// </div>
	);
};

export default ExpandSubEvents;
