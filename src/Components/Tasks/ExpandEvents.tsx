import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedTask, subEventActions } from '../../store/subevent-slice';
import classes from './ExpandEvents.module.css';

const ExpandEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	const dispatch = useAppDispatch();

	const { parentId } = useAppSelector((state) => state.subEvents);

	const id = props.id;

	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const clickHandler = useCallback(() => {
		dispatch(subEventActions.SET_PARENT_ID(id));
		dispatch(subEventActions.SET_FETCH_ID(id));
	}, [dispatch, id]);

	useEffect(() => {
		dispatch(setSelectedTask(parentId));
	}, [parentId, dispatch]);

	// console.log(subEventCtx.selectedTask);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
};

export default React.memo(ExpandEvents);
