import React from 'react';

import { eventActions } from '../../store/event-slice';
import { useAppDispatch } from '../../store/hooks';
import { subEventActions } from '../../store/subevent-slice';
import classes from './ExpandEvents.module.css';

const ExpandEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	const dispatch = useAppDispatch();

	const id = props.id;

	let buttonClasses;
	if (props.subEvents > 0) {
		buttonClasses = `${classes['sub-event-button']}`;
	} else {
		buttonClasses = `${classes['no-sub-events']}`;
	}

	const clickHandler = () => {
		dispatch(subEventActions.SET_PARENT_ID(id));
		dispatch(subEventActions.SET_FETCH_ID(id));
		dispatch(eventActions.SET_SELECTED_EVENT(id));
		dispatch(subEventActions.RESET_HIERARCHY());
	};

	return (
		<button onClick={clickHandler} className={buttonClasses}>
			{props.subEvents}
		</button>
	);
};

export default ExpandEvents;

// NOTE  Moved to subEventView
// useEffect(() => {
// 	dispatch(fetchSubEventData(fetchId));
// }, [dispatch, fetchId]);

// NOTE Moved up to the clickHandler
// useEffect(() => {
// 	dispatch(eventActions.SET_SELECTED_EVENT(id));
// }, [dispatch, id]);
