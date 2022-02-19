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
	const { hierarchy } = subEventCtx;
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

	const triggerHierarchy = useCallback(() => {
		setHierarchy((prevState) => {
			return [...prevState, ...selectedSubEvent];
		});
	}, [selectedSubEvent, setHierarchy]);

	const clickHandler = useCallback(() => {
		setSubEventParentId(id);
		setFetchId(id);
		triggerHierarchy();
		// FIXME This setHierarchy works, but executes before the selectedSubEVent has been updated
		// setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
	}, [id, setFetchId, setSubEventParentId, triggerHierarchy]);

	// Filter the event from the subEvent array and set it to selectedSubEvent
	useEffect(() => {
		setSelectedSubEvent(
			subEvents.filter((subEvent) => subEvent.id === subEventParentId)
		);
	}, [setSelectedSubEvent, subEventParentId, subEvents]);

	// Push the event to the Hierarchy display
	// useEffect(() => {
	// 	const containsEvent = (hierarchy: Event[]) => {
	// 		hierarchy?.find((e) => {
	// 			return e.id === id;
	// 		});
	// 	};
	// 	if (containsEvent()) {
	// 		setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
	// 	}
	// }, [hierarchy, id, selectedSubEvent, setHierarchy]);

	console.log(hierarchy);
	console.log(selectedSubEvent);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
};

export default React.memo(ExpandSubEvents);

// const triggerHierarchy = useCallback(() => {
// setHierarchy((prevState) => {
// if (hierarchy.some((e) => e.id === id)) {
// return [...prevState, ...selectedSubEvent];
// } else {
// return prevState;
// }
// });
