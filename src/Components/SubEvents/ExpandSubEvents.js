import classes from './ExpandSubEvents.module.css';

const ExpandSubEvents = (props) => {
	let importedClasses = `${classes['sub-event-button']}`;

	if (props.subEvents === 0) {
		importedClasses = 'no-sub-events';
	}

	const findParentId = () => {
		console.log(props.id);
		props.onGetSubEvents(props.id);
	};
	// console.log(props.subEvents);

	return (
		// <div>
		<button onClick={findParentId} className={importedClasses}>
			{props.subEvents}
		</button>
		// </div>
	);
};

export default ExpandSubEvents;
