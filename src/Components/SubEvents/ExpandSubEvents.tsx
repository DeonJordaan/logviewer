import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
	setHierarchy,
	setSelectedSubEvent,
	subEventActions,
} from '../../store/subevent-slice';
import classes from './ExpandSubEvents.module.css';

const ExpandSubEvents: React.FC<{
	id: number;
	subEvents: number;
}> = React.memo((props) => {
	const dispatch = useAppDispatch();
	const subEvents = useAppSelector(
		(state: { subEvents: any }) => state.subEvents
	); //FIXME

	// Get id of event for when it is clicked
	const id = React.useMemo(() => props.id, [props.id]);

	let eventIds: number[] = useMemo(() => [], []);

	if (subEvents.hierarchy) {
		for (const event of subEvents.hierarchy) {
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
	useEffect(() => {
		dispatch(setSelectedSubEvent());
	}, [dispatch]);

	// Respond to subevent button click event
	const clickHandler = useCallback(() => {
		dispatch(subEventActions.SET_SUB_EVENT_PARENT_ID(id));
		dispatch(subEventActions.SET_FETCH_ID(id));
	}, [dispatch, id]);

	// TODO
	// Add the selectedSubEvent to the hierarchy
	useEffect(() => {
		if (!eventIds.includes(id))
			dispatch(setHierarchy(());
	}, [eventIds, id]);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
});

export default ExpandSubEvents;
