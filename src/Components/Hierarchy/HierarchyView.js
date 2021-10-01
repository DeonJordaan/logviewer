import React, { useContext } from 'react';

import EventContext from '../../Context/event-context';

import HierarchyViewColumnHeader from './HierarchyViewColumnHeader';
import HierarchyViewItem from './HierarchyViewItem';

import classes from './HierarchyView.module.css';

const HierarchyView = (props) => {
	const eventCtx = useContext(EventContext);
	// console.log(eventCtx);
	// console.log(eventCtx.hierarchy);

	let app = 'App';
	let host = 'Host';

	if (eventCtx.hierarchy.length > 0) {
		app = eventCtx.hierarchy[0].App;
		host = eventCtx.hierarchy[0].host;
	}
	// console.log(eventCtx.hierarchy[0]);
	// console.log(eventCtx.hierarchy[0].App);

	// const status = eventCtx.hierarchy[0].status;
	// const status = 'status';

	// const app = eventCtx.hierarchy[0].App ? eventCtx.hierarchy[0].App : 'App';
	// const host = eventCtx.hierarchy[0].host
	// 	? eventCtx.hierarchy[0].host
	// 	: 'App';

	return (
		<div className={classes['hierarchy-view']}>
			<h3 className={classes['hierarchy-header']}>
				<span>Event Hierarchy Application:</span>
				<span className={classes.box}>{app}</span>
				<span>running on Host:</span>
				<span className={classes.box}>{host}</span>
				{/* Event Hierarchy Application: {app} running on Host: {host} */}
			</h3>
			<HierarchyViewColumnHeader />
			{/* <HierarchyViewItem status={props.setStatus({ status })} /> */}
			<HierarchyViewItem setStatus={props.setStatus} />
		</div>
	);
};

export default React.memo(HierarchyView);
