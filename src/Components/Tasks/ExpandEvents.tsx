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

	// const { events } = useAppSelector((state) => state.events);
	// const { parentId, fetchId } = useAppSelector((state) => state.subEvents);

	const id = props.id;

	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const clickHandler = () => {
		console.log('EXPAND EVENT');
		dispatch(subEventActions.SET_PARENT_ID(id));
		dispatch(subEventActions.SET_FETCH_ID(id));
		dispatch(eventActions.SET_SELECTED_EVENT(id));
	};

	// NOTE  Moved to subEventView
	// useEffect(() => {
	// 	dispatch(fetchSubEventData(fetchId));
	// }, [dispatch, fetchId]);

	// NOTE Moved up to the clickHandler
	// useEffect(() => {
	// 	dispatch(eventActions.SET_SELECTED_EVENT(id));
	// }, [dispatch, id]);

	// console.log(subEventCtx.selectedTask);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
};

export default ExpandEvents;
