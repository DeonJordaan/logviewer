import './ExpandSubEvents.css';

const ExpandSubEvents = (props) => {
	let classes = 'sub-events';

	if (props.subEvents === 0) {
		classes = 'no-sub-events';
	}

	return (
		<button onClick={props.onClick} className={classes}>
			{props.subEvents}
		</button>
	);
};

export default ExpandSubEvents;
