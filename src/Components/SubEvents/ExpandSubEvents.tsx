import React, { useContext, useEffect } from 'react';

import classes from './ExpandSubEvents.module.css';
import SubEventContext from '../../store/sub-event-context';
// import EventContext from '../../store/event-context';

const ExpandSubEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	// Extract contexts
	// const eventCtx = useContext(EventContext);
	const subEventCtx = useContext(SubEventContext);
	const subEvents = subEventCtx.subEvents;
	const subEventParentId = subEventCtx.subEventParentId;
	const selectedSubEvent = subEventCtx.selectedSubEvent;
	// Extract state setters
	const setSubEventParentId = subEventCtx.setSubEventParentId;
	const setFetchId = subEventCtx.setFetchId;
	const setSelectedSubEvent = subEventCtx.setSelectedSubEvent;
	const setHierarchy = subEventCtx.setHierarchy;

	//FIXME Check where the hierarchy main item is being drawn from
	const id = props.id;

	let subEventQuantity = props.subEvents;
	let importedClasses = `${classes['sub-event-button']}`;
	if (subEventQuantity === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const clickHandler = () => {
		console.log(id);
		setSubEventParentId(id);
		setFetchId(id);
	};

	useEffect(() => {
		setSelectedSubEvent(
			subEvents.filter((subEvent) => subEvent.id === subEventParentId)
		);
	}, [subEvents, setSelectedSubEvent, subEventParentId]);

	useEffect(() => {
		setHierarchy(selectedSubEvent);
		// setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
	}, [selectedSubEvent, setHierarchy]);

	console.log(subEventParentId);
	console.log(subEventCtx.selectedSubEvent);
	console.log(subEventCtx.hierarchy);

	return (
		<button onClick={clickHandler} className={importedClasses}>
			{subEventQuantity}
		</button>
	);
};

export default ExpandSubEvents;
