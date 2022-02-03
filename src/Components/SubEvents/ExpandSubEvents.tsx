import React, { useContext, useEffect } from 'react';

import classes from './ExpandSubEvents.module.css';

import SubEventContext from '../../store/sub-event-context';

const ExpandSubEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	const subEventCtx = useContext(SubEventContext);
	const subEvents = subEventCtx.subEvents;
	const subEventParentId = subEventCtx.subEventParentId;
	// const setHierarchy = subEventCtx.setHierarchy;

	const setFetchId = subEventCtx.setFetchId;
	const setSubEventParentId = subEventCtx.setSubEventParentId;
	const setSelectedSubEvent = subEventCtx.setSelectedSubEvent;

	// TODOLATER - Can I get these values from context rather than props?
	const id = props.id;
	let subEventQuantity = props.subEvents;

	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const fetchIdHandler = () => {
		console.log(id);
		setSubEventParentId(id);
		setFetchId(id);
	};

	// Extract selected subEvent

	useEffect(() => {
		setSelectedSubEvent(
			subEvents.filter((subEvent) => subEvent.id === subEventParentId)
		);
	}, [setSelectedSubEvent, subEventParentId, subEvents]);
	console.log(subEventCtx.selectedSubEvent);

	// useEffect(() => {
	// 	const clickedSubEvent = subEventCtx.subEvents.filter(
	// 		(subEvent) => subEvent.id === subEventCtx.subEventParentId
	// 	);
	// 	setHierarchy((prevState) => [...prevState, ...clickedSubEvent]);
	// }, [setHierarchy, subEventCtx.subEventParentId, subEventCtx.subEvents]);

	return (
		<button onClick={fetchIdHandler} className={importedClasses}>
			{subEventQuantity}
			{/* {subEventQuantity === 0 ? <p>-</p> : subEventQuantity} */}
		</button>
	);
};

export default ExpandSubEvents;
