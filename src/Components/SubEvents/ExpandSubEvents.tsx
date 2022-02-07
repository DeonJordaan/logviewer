import React, { useCallback, useContext, useEffect } from 'react';

import SubEventContext from '../../store/sub-event-context';
import classes from './ExpandSubEvents.module.css';

const ExpandSubEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	// Extract contexts
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

	// Set CSS classes to style button if it has sub-events
	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const clickHandler = useCallback(() => {
		setSubEventParentId(id);
		setFetchId(id);
	}, [id, setFetchId, setSubEventParentId]);

	// Filter the event from the subEvent array and set it to selectedSubEvent
	useEffect(() => {
		setSelectedSubEvent(
			subEvents.filter((subEvent) => subEvent.id === subEventParentId)
		);
	}, [setSelectedSubEvent, subEventParentId, subEvents]);

	// Push the event to the Hierarchy display
	useEffect(() => {
		setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
	}, [selectedSubEvent, setHierarchy]);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
};

export default React.memo(ExpandSubEvents);
