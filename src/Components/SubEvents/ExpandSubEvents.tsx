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

	if (hierarchy) {
		for (const event of hierarchy) {
			eventIds.push(event.Id);
		}
	}

	// Set CSS classes to style button if it has sub-events
	let buttonClasses;
	if (props.subEvents > 0) {
		buttonClasses = `${classes['sub-event-button']}`;
	} else {
		buttonClasses = `${classes['no-sub-events']}`;
	}

	// Respond to subevent button click event
	const clickHandler = useCallback(() => {
		// dispatch(subEventActions.SET_SUB_EVENT_PARENT_ID(id));
		dispatch(subEventActions.SET_FETCH_ID(id));
		dispatch(subEventActions.SET_SELECTED_SUB_EVENT(id));
		if (!eventIds.includes(id)) {
			dispatch(subEventActions.SET_HIERARCHY());
		}
	}, [dispatch, eventIds, id]);

	return (
		<button onClick={clickHandler} className={buttonClasses}>
			{props.subEvents}
		</button>
	);
});

export default ExpandSubEvents;