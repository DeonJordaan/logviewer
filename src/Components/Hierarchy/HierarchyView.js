import React, { useContext } from 'react';

// import EventContext from '../../store/event-context';
import SubEventContext from '../../store/sub-event-context';

import HierarchyViewHeader from './HierarchyViewHeader';
import HierarchyViewItem from './HierarchyViewItem';

import classes from './HierarchyView.module.css';
import HierarchyViewMainItem from './HierarchyViewMainItem';

const HierarchyView = (props) => {
	// const eventCtx = useContext(EventContext);
	const subEventCtx = useContext(SubEventContext);

	// console.log(eventCtx);
	// console.log(subEventCtx.hierarchy);

	let app = 'App';
	let host = 'Host';

	if (subEventCtx.hierarchy.length > 0) {
		app = subEventCtx.hierarchy[0].App;
		host = subEventCtx.hierarchy[0].host;
	}

	let hierarchyContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (subEventCtx.hierarchy) {
		hierarchyContent = (
			<tbody>
				{subEventCtx.hierarchy.map((task) => (
					<HierarchyViewItem
						key={task.key}
						subEvents={task.subEvents}
						status={props.setStatus(task.status)}
						startTime={task.startTime}
						endTime={task.endTime}
						id={task.id}
						message={task.message}
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
				<HierarchyViewMainItem setStatus={props.setStatus} />
				<>{hierarchyContent}</>
			</table>
		</div>
	);
};

export default React.memo(HierarchyView);

///////////////////////
// let key = '';
// let status = '';
// let subEvents = '';
// let startTime = '0000-00-00T00:00:00.00';
// let endTime = '0000-00-00T00:00:00.00';
// let id = '';
// let message = '';

// if (subEventCtx.hierarchy.length > 0) {
// 	key = subEventCtx.hierarchy[0].key;
// 	status = props.setStatus(subEventCtx.hierarchy[0].status);
// 	subEvents = subEventCtx.hierarchy[0].subEvents;
// 	startTime = subEventCtx.hierarchy[0].startTime;
// 	endTime = subEventCtx.hierarchy[0].endTime;
// 	id = subEventCtx.hierarchy[0].id;
// 	message = subEventCtx.hierarchy[0].message;
// }
