import React, { useContext } from 'react';

import SubEventContext from '../../store/sub-event-context';
import HierarchyViewHeader from './HierarchyViewHeader';
import HierarchyViewItem from './HierarchyViewItem';
import HierarchyViewMainItem from './HierarchyViewMainItem';
import classes from './HierarchyView.module.css';
// import Status from '../../Interfaces/statusInterface';

const HierarchyView: React.FC<{
	setStatus: (statusCode: number) => string;
}> = (props) => {
	const subEventCtx = useContext(SubEventContext);

	let app: string | undefined = 'App'; //FIXME: Setting as undefined to remove errors below. Is this correct?
	let host: string | undefined = 'Host';

	// console.log(subEventCtx.hierarchy);

	if (subEventCtx.selectedTask && subEventCtx.selectedTask.length > 0) {
		app = subEventCtx.selectedTask[0].App;
		host = subEventCtx.selectedTask[0].host;
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
export default React.memo(HierarchyView);
