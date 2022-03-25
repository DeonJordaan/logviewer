import React from 'react';

import classes from './HierarchyViewHeader.module.css';

const HierarchyViewHeader: React.FC = () => {
	return (
		<tr className={classes['hierarchy-column-header']}>
			<th></th>
			<th>Status</th>
			<th>Sub-Events</th>
			<th>Started</th>
			<th>Completed</th>
			<th>ID</th>
			<th>Message</th>
		</tr>
	);
};

export default HierarchyViewHeader;
