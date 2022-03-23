import React from 'react';

import HierarchyViewHeader from './HierarchyViewHeader';
import HierarchyViewItem from './HierarchyViewItem';
import HierarchyViewMainItem from './HierarchyViewMainItem';
import classes from './HierarchyView.module.css';
import { useAppSelector } from '../../store/hooks';

const HierarchyView: React.FC<{
	setStatus: (statusCode: number) => string;
}> = (props) => {
	const { hierarchy } = useAppSelector((state) => state.subEvents);
	const { selectedEvent } = useAppSelector((state) => state.events);

	let app: string | undefined = 'App';
	let host: string | undefined = 'Host';

	if (selectedEvent && selectedEvent.length > 0) {
		app = selectedEvent[0].App;
		host = selectedEvent[0].host;
	}

	let hierarchyContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (hierarchy.length > 0) {
		console.log(hierarchy);
		hierarchyContent = (
			<tbody>
				{hierarchy.map((event) => (
					<HierarchyViewItem
						key={event.key}
						subEvents={event.subEvents}
						status={props.setStatus(event.status)}
						startTime={event.startTime}
						endTime={event.endTime}
						id={event.id}
						message={event.message}
					/>
				))}
			</tbody>
		);
	}

	// TODO IMPLEMENT ERROR HANDLING STATES
	// if (subEventCtx.error) {
	// 	hierarchyContent = (
	// 		<tbody>
	// 			<tr>
	// 				<td>{subEventCtx.error}</td>
	// 			</tr>
	// 		</tbody>
	// 	);
	// }

	// if (subEventCtx.isLoading) {
	// 	hierarchyContent = (
	// 		<tbody>
	// 			<tr>
	// 				<td>Loading...</td>
	// 			</tr>
	// 		</tbody>
	// 	);
	// }

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

// export default HierarchyView;
export default HierarchyView;
