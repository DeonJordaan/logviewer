import React, { useContext } from 'react';

// import EventContext from '../../store/event-context';
import SubEventContext from '../../store/sub-event-context';

import HierarchyViewHeader from './HierarchyViewHeader';
import HierarchyViewItem from './HierarchyViewItem';

import classes from './HierarchyView.module.css';

const HierarchyView = (props) => {
	// const eventCtx = useContext(EventContext);
	const subEventCtx = useContext(SubEventContext);

	// console.log(eventCtx);
	// console.log(eventCtx.hierarchy);

	let app = 'App';
	let host = 'Host';

	if (subEventCtx.hierarchy.length > 0) {
		app = subEventCtx.hierarchy[0].App;
		host = subEventCtx.hierarchy[0].host;
	}

	let status = '-';
	let subEvents = '0';
	let startTime = '0000-00-00T00:00:00.00';
	let endTime = '0000-00-00T00:00:00.00';
	let id = '0';
	let message = '-';

	if (subEventCtx.hierarchy.length > 0) {
		status = props.setStatus(subEventCtx.hierarchy[0].status);
		subEvents = subEventCtx.hierarchy[0].subEvents;
		startTime = subEventCtx.hierarchy[0].startTime;
		endTime = subEventCtx.hierarchy[0].endTime;
		id = subEventCtx.hierarchy[0].id;
		message = subEventCtx.hierarchy[0].message;
	}

	let hierarchyContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (subEventCtx.hierarchy.length > 0) {
		hierarchyContent = (
			<tbody>
				{subEventCtx.hierarchy.map((task) => (
					<HierarchyViewItem
						key={task.key}
						subEvents={subEvents}
						status={status}
						startTime={startTime}
						endTime={endTime}
						id={id}
						message={message}
					/>
				))}
			</tbody>
		);
	}

	if (subEventCtx.error) {
		hierarchyContent = (
			<tbody>
				<tr>
					<td>{subEventCtx.error}</td>
				</tr>
			</tbody>
		);
	}

	if (subEventCtx.isLoading) {
		hierarchyContent = (
			<tbody>
				<tr>
					<td>Loading...</td>
				</tr>
			</tbody>
		);
	}

	return (
		<div className={classes['hierarchy-view']}>
			<h3 className={classes['hierarchy-header']}>
				<span>Event Hierarchy</span>
			</h3>
			<h4 className={classes['hierarchy-header']}>
				<span>Application:</span>
				<span className={classes.box}>{app}</span>
				<span>running on Host:</span>
				<span className={classes.box}>{host}</span>
				{/* Event Hierarchy Application: {app} running on Host: {host} */}
			</h4>
			<table>
				<thead>
					<HierarchyViewHeader />
				</thead>
				<>{hierarchyContent}</>
			</table>
		</div>
	);
};

export default React.memo(HierarchyView);
