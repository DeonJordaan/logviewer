import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
	fetchSubEventData,
	// setHierarchy,
	// setSelectedSubEvent,
	subEventActions,
} from '../../store/subevent-slice';
import classes from './ExpandSubEvents.module.css';

const ExpandSubEvents: React.FC<{
	id: number;
	subEvents: number;
}> = React.memo((props) => {
	const dispatch = useAppDispatch();
	const { hierarchy } = useAppSelector((state) => state.subEvents); //FIXME

	// Get id of event for when it is clicked
	const id = React.useMemo(() => props.id, [props.id]);

	let eventIds: number[] = useMemo(() => [], []);

	if (hierarchy) {
		for (const event of hierarchy) {
			eventIds.push(event.id);
		}
	}

	// Set CSS classes to style button if it has sub-events
	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	// Filter the event from the subEvent array and set it to selectedSubEvent
	// useEffect(() => {
	// if (selectedSubEvent) {
	// dispatch(subEventActions.SET_SELECTED_SUB_EVENT(id));
	// }
	// }, [dispatch, id]);

	// Respond to subevent button click event
	const clickHandler = useCallback(() => {
		dispatch(subEventActions.SET_SUB_EVENT_PARENT_ID(id));
		dispatch(subEventActions.SET_FETCH_ID(id));
		dispatch(subEventActions.SET_SELECTED_SUB_EVENT(id));
		if (!eventIds.includes(id)) {
			dispatch(subEventActions.SET_HIERARCHY());
			// dispatch(setHierarchy());
		}
		// TODO
		// As with Hierarchy below, should I be passing the selected event to selectedSubEvent implicitly?
		// dispatch(subEventActions.SET_SELECTED_SUB_EVENT());
	}, [dispatch, eventIds, id]);

	// TODO
	// Add the selectedSubEvent to the hierarchy
	// Should I consider a different approach where I implicitly pass the selectedSubEvent here, and not just rely on it happening when ID changes? I THINK so.
	// useEffect(() => {
	// 	if (!eventIds.includes(id)) {
	// 		dispatch(subEventActions.SET_HIERARCHY());
	// 		// dispatch(setHierarchy());
	// 	}
	// }, [dispatch, eventIds, id]);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
});

export default ExpandSubEvents;
