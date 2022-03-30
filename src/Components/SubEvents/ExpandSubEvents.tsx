import React, { useCallback, useContext, useEffect } from 'react';
import SubEventContext from '../../store/sub-event-context';
import classes from './ExpandSubEvents.module.css';
// import Event from '../../types/event';

const ExpandSubEvents: React.FC<{
	id: number;
	subEvents: number;
}> = React.memo((props) => {
	// Extract contexts
	const subEventCtx = useContext(SubEventContext);
	const {
		subEvents,
		subEventParentId,
		// selectedSubEvent,
		hierarchy,
		setSubEventParentId,
		setFetchId,
		setSelectedSubEvent,
		// setHierarchy,
		setEventIds,
	} = subEventCtx;

	// Get id of event for when it is clicked
	const id = React.useMemo(() => props.id, [props.id]);

	// let eventIds: number[] = useMemo(() => [], []);

	//FIXMETODO
	// useEffect(() => {
	// 	if (hierarchy) {
	// 		for (const event of hierarchy) {
	// 			setEventIds((prevState) => {
	// 				return [...prevState, event.id];
	// 			});
	// 			// eventIds.push(event.id);
	// 		}
	// 	}
	// }, [hierarchy, setEventIds]);

	// Set CSS classes to style button if it has sub-events
	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	// Tried moving the setHierarchy to a separate function, but it did not make a difference
	// const triggerHierarchy = useCallback(() => {
	// 	if (!eventIds.includes(id))
	// 		setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
	// }, [eventIds, id, selectedSubEvent, setHierarchy]);

	// Filter the event from the subEvent array and set it to selectedSubEvent

	//FIXMETODO
	// useEffect(() => {
	// 	setSelectedSubEvent(
	// 		subEvents.filter((subEvent) => subEvent.id === subEventParentId)
	// 	);
	// 	// triggerHierarchy();
	// }, [setSelectedSubEvent, subEventParentId, subEvents]);

	// Respond to subevent button click event
	const clickHandler = useCallback(() => {
		setSubEventParentId(id);
		setFetchId(id);
		// setSubEvent();
		// OPEN FIXME This setHierarchy works, but executes before the selectedSubEVent has been updated
		// Furthermore, if a new subevent is selected, it checks if the NEW clicked one has been added
		// BUT sends the OLD event still in selectedSubEvent to the hierarchy before IT has been updated
		// meaning that the check does not stop the same event being added twice
		// if (!eventIds.includes(id))
		// 	setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
		// CLOSE
	}, [id, setFetchId, setSubEventParentId]);

	// Tried useRef to get setHierarchy to use the latest selectedSubEvent
	// const subEventRef = useRef<Event[]>([]);
	// subEventRef.current = hierarchy;

	// Add the selectedSubEvent to the hierarchy
	// useEffect(() => {
	// 	if (!eventIds.includes(id))
	// 		setHierarchy((prevState) => {
	// 			return [...prevState, ...selectedSubEvent];
	// 		});
	// }, [eventIds, hierarchy, id, selectedSubEvent, setHierarchy]);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
});

export default ExpandSubEvents;

//OPEN .some METHOD TO CHECK IF HIERARCHY CONTAINS SELECTED TASK ALREADY
// const containsTask = (task: Event) => task.id === id;

// const containsEvent = (hierarchy: Event[]) => {
// 	return hierarchy.some(containsTask);
// };

// if (!containsEvent(hierarchy)) {
// 	console.log(containsTask);
// CLOSE
