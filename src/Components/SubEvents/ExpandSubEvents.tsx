import React, { useContext, useEffect } from 'react';
import classes from './ExpandSubEvents.module.css';
import SubEventContext from '../../store/sub-event-context';

const ExpandSubEvents: React.FC<{
	id: number;
	subEvents: number;
}> = (props) => {
	const subEventCtx = useContext(SubEventContext);
	const setSubEventParentId = subEventCtx.setSubEventParentId;
	const setSelectedSubEvent = subEventCtx.setSelectedSubEvent;
	// TODO Can I get these values from context rather than props?
	const id = props.id;
	let subEvents = props.subEvents;

	let importedClasses = `${classes['sub-event-button']}`;
	if (subEvents === 0) {
		importedClasses = `${classes['no-sub-events']}`;
	}

	const parentIdHandler = () => {
		setSubEventParentId(id);
	};

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
	// useEffect(() => {
	// 	setHierarchy(
	// 		subEventCtx.subEvents.filter(
	// 			(task) => task.id === parseInt(subEventCtx.parentId)
	// 		)
	// 	);
	// }, []);

	return (
		<button onClick={parentIdHandler} className={importedClasses}>
			{subEvents === 0 ? <p>-</p> : subEvents}
		</button>
	);
};

export default ExpandSubEvents;
