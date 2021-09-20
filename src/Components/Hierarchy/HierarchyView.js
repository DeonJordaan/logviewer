import HierarchyViewColumnHeader from './HierarchyViewColumnHeader';
import HierarchyViewItem from './HierarchyViewItem';

import classes from './HierarchyView.module.css';

const HierarchyView = (props) => {
	// const app = props.hierarchyData.App;
	const app = 'app';
	// const host = props.hierarchyData.host;
	const host = 'host';

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
			<HierarchyViewItem
				// status={props.setStatus(props.hierarchyData.status)}
				// subEvent={props.hierarchyData}
				// startTime={props.hierarchyData.startTime}
				// endTime={props.hierarchyData.endTime}
				// id={props.hierarchyData.id}
				// message={props.hierarchyData.message}
				eventDetails={props.hierarchyData}
				setStatus={props.setStatus}
			/>
		</div>
	);
};

export default HierarchyView;
