import React, { useContext } from 'react';

import HierarchyViewColumnHeader from './HierarchyViewColumnHeader';
import HierarchyViewItem from './HierarchyViewItem';

import classes from './HierarchyView.module.css';
import EventContext from '../../Context/event-context';

const HierarchyView = (props) => {
	const eventCtx = useContext(EventContext);
	console.log(eventCtx);

	const app = eventCtx.hierarchy[0].App ? eventCtx.hierarchy[0].App : 'App';
	const host = eventCtx.hierarchy[0].host
		? eventCtx.hierarchy[0].host
		: 'App';

	// const app = 'App';
	// const host = 'Host';

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
			{/* <HierarchyViewItem setStatus={props.status} /> */}
		</div>
	);
};

export default React.memo(HierarchyView);
