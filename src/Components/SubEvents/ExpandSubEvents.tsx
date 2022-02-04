import React, { useContext, useEffect } from 'react';

// import EventContext from '../../store/event-context';
import SubEventContext from '../../store/sub-event-context';
import classes from './ExpandSubEvents.module.css';

const ExpandSubEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	// Extract contexts
	// const eventCtx = useContext(EventContext);
	const subEventCtx = useContext(SubEventContext);
	const { subEvents } = subEventCtx;
	const { subEventParentId } = subEventCtx;
	const { selectedSubEvent } = subEventCtx;
	// Extract state setters
	const { setSubEventParentId } = subEventCtx;
	const { setFetchId } = subEventCtx;
	const { setSelectedSubEvent } = subEventCtx;
	const { setHierarchy } = subEventCtx;

	// Get id of event for when it is clicked
	const id = props.id;

	// Set CSS classes bto style button if it has sub-events
	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	// Get parentId to select event and to set it to fetch & display its sub-events
	const clickHandler = () => {
		console.log(id);
		setSubEventParentId(id);
		setFetchId(id);
	};

	// Filter the event from the subEvent array
	useEffect(() => {
		setSelectedSubEvent(
			subEvents.filter((subEvent) => subEvent.id === subEventParentId)
		);
	}, [subEvents, setSelectedSubEvent, subEventParentId]);

	// Push the event to the Hierarchy display
	useEffect(() => {
		// setHierarchy(selectedSubEvent);
		setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
	}, [selectedSubEvent, setHierarchy]);

	console.log(subEventParentId);
	console.log(subEventCtx.selectedSubEvent);
	console.log(subEventCtx.hierarchy);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
};

export default ExpandSubEvents;
