import HierarchyViewColumnHeader from './HierarchyViewColumnHeader';
import HierarchyViewItem from './HierarchyViewItem';

import './HierarchyView.css';

const HierarchyView = (props) => {
	const app = props.hierarchyData.app;
	const host = props.hierarchyData.host;

	return (
		<div className="hierarchy-view">
			<h3 className="hierarchy-header">
				<span>Event Hierarchy Application:</span>
				<span className="box">{app}</span>
				<span>running on Host:</span>
				<span className="box">{host}</span>
				{/* Event Hierarchy Application: {app} running on Host: {host} */}
			</h3>
			<HierarchyViewColumnHeader />
			<HierarchyViewItem eventDetails={props.hierarchyData} />
		</div>
	);
};

export default HierarchyView;
