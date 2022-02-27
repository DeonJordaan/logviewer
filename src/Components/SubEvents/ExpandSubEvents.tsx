import React, { useCallback, useContext, useEffect } from 'react';

import SubEventContext from '../../store/sub-event-context';
import classes from './ExpandSubEvents.module.css';
// import Event from '../../types/event';
import HierarchyContext from '../../store/hierarchy-context';

const ExpandSubEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	// Extract contexts
	const subEventCtx = useContext(SubEventContext);
	const {
		subEvents,
		subEventParentId,
		// selectedSubEvent,
		// hierarchy,
		setSubEventParentId,
		setFetchId,
		setSelectedSubEvent,
		// setHierarchy,
	} = subEventCtx;

	const hierarchyCtx = useContext(HierarchyContext);
	const { triggerHierarchy } = hierarchyCtx;

	// Get id of event for when it is clicked
	const id = props.id;

	// Set CSS classes to style button if it has sub-events
	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	// const triggerHierarchy = useCallback(() => {
	// 	setHierarchy((prevState) => {
	// 		return [...prevState, ...selectedSubEvent];
	// 	});
	// }, [selectedSubEvent, setHierarchy]);

	// Push the event to the Hierarchy display
	// const triggerHierarchy = useCallback(() => {
	// 	const containsTask = (event: Event) => event.id === id;

	// 	const containsEvent: (hierarchy: Event[]) => boolean = () => {
	// 		return hierarchy.some(containsTask);
	// 	};

	// 	if (!containsEvent(hierarchy)) {
	// 		setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
	// 	}
	// }, [hierarchy, id, selectedSubEvent, setHierarchy]);

	const clickHandler = useCallback(() => {
		setSubEventParentId(id);
		setFetchId(id);
		// FIXME This setHierarchy works, but executes before the selectedSubEVent has been updated
		// setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
	}, [id, setFetchId, setSubEventParentId]);

	// Filter the event from the subEvent array and set it to selectedSubEvent
	useEffect(() => {
		setSelectedSubEvent(
			subEvents.filter((subEvent) => subEvent.id === subEventParentId)
		);
		triggerHierarchy(id);
	}, [
		id,
		setSelectedSubEvent,
		subEventParentId,
		subEvents,
		triggerHierarchy,
	]);

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
