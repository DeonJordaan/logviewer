import React, { useContext, useEffect } from 'react';
import classes from './ExpandSubEvents.module.css';
import SubEventContext from '../../store/sub-event-context';

const ExpandSubEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	const subEventCtx = useContext(SubEventContext);
	// const setSubEventParentId = subEventCtx.setSubEventParentId;
	const setSelectedSubEvent = subEventCtx.setSelectedSubEvent;
	const setHierarchy = subEventCtx.setHierarchy;

	const setFetchId = subEventCtx.setFetchId;

	// TODOLATER - Can I get these values from context rather than props?
	const id = props.id;
	let subEvents = props.subEvents;

	let importedClasses = `${classes['sub-event-button']}`;
	if (subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const parentIdHandler = () => {
		setFetchId(id);
	};

	// Extract selected subEvent

	useEffect(() => {
		setSelectedSubEvent(
			subEventCtx.subEvents.filter(
				(subEvent) => subEvent.id === subEventCtx.subEventParentId
			)
		);
	}, [
		setSelectedSubEvent,
		subEventCtx.subEventParentId,
		subEventCtx.subEvents,
	]);

	useEffect(() => {
		const clickedSubEvent = subEventCtx.subEvents.filter(
			(subEvent) => subEvent.id === subEventCtx.subEventParentId
		);
		setHierarchy((prevState) => [...prevState, ...clickedSubEvent]);
	}, [setHierarchy, subEventCtx.subEventParentId, subEventCtx.subEvents]);

	return (
		<button onClick={parentIdHandler} className={importedClasses}>
			{subEvents === 0 ? <p>-</p> : subEvents}
		</button>
	);
};

export default ExpandSubEvents;
