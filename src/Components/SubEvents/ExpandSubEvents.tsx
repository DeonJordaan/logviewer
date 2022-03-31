import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { subEventActions } from '../../store/subevent-slice';
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
	// let eventIds: number[]

	if (hierarchy) {
		for (const event of hierarchy) {
			eventIds.push(event.Id);
		}
	}

	// Set CSS classes to style button if it has sub-events
	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	// Respond to subevent button click event
	const clickHandler = useCallback(() => {
		dispatch(subEventActions.SET_SUB_EVENT_PARENT_ID(id));
		dispatch(subEventActions.SET_FETCH_ID(id));
		dispatch(subEventActions.SET_SELECTED_SUB_EVENT(id));
		if (!eventIds.includes(id)) {
			dispatch(subEventActions.SET_HIERARCHY());
		}
	}, [dispatch, eventIds, id]);

	// TODO
	// Should I consider a different approach where I implicitly pass the selectedSubEvent to SET_HIERARCHY, and not just rely on it happening when ID changes? I THINK so.

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
});

export default ExpandSubEvents;

// Filter the event from the subEvent array and set it to selectedSubEvent
// useEffect(() => {
// if (selectedSubEvent) {
// dispatch(subEventActions.SET_SELECTED_SUB_EVENT(id));
// }
// }, [dispatch, id]);

// Add the selectedSubEvent to the hierarchy

// useEffect(() => {
// 	if (!eventIds.includes(id)) {
// 		dispatch(subEventActions.SET_HIERARCHY());
// 		// dispatch(setHierarchy());
// 	}
// }, [dispatch, eventIds, id]);
