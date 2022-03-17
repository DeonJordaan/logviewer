import React, { useCallback, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import EventContext from '../../store/event-context';
import SubEventContext from '../../store/sub-event-context';
import { setSelectedTask, subEventActions } from '../../store/subevent-slice';
import classes from './ExpandEvents.module.css';

const ExpandEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	const dispatch = useDispatch();
	// Extract contexts
	const eventCtx = useContext(EventContext);
	const subEventCtx = useContext(SubEventContext);
	const { tasks } = eventCtx;
	const { parentId } = subEventCtx;
	// Extract state setters
	// const { setFetchId } = subEventCtx;
	// const { setSelectedTask } = subEventCtx;
	// const { setHierarchy } = subEventCtx;

	//FIXME Check where the hierarchy main item is being drawn from
	const id = props.id;

	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	//TODO Should I not just avoid the useEffect and just 'manually' set the selectedTask when the button is clicked?
	const clickHandler = useCallback(() => {
		dispatch(subEventActions.SET_PARENT_ID(id));
		dispatch(subEventActions.SET_FETCH_ID(id));
	}, [dispatch, id]);

	// FIXME NOT SURE HOW TO DO THIS
	useEffect(() => {
		dispatch(setSelectedTask());
	}, [tasks, parentId, dispatch]);

	// console.log(subEventCtx.selectedTask);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
};

export default React.memo(ExpandEvents);
