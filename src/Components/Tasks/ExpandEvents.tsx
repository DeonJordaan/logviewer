import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	fetchSubEventData,
	// setSelectedTask,
	subEventActions,
} from '../../store/subevent-slice';
import classes from './ExpandEvents.module.css';

const ExpandEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	const dispatch = useAppDispatch();

	// const { events } = useAppSelector((state) => state.events);
	const { fetchId } = useAppSelector((state) => state.subEvents);
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
	};

	useEffect(() => {
		dispatch(fetchSubEventData(fetchId));
	}, [dispatch, fetchId]);

	// useEffect(() => {
	// 	dispatch(setSelectedTask(events));
	// }, [parentId, dispatch, events]);

	// console.log(subEventCtx.selectedTask);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
};

export default React.memo(ExpandEvents);
