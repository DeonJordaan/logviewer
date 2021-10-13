import React from 'react';

import classes from './HierarchyViewHeader.module.css';

const HierarchyViewHeader = () => {
	return (
		<tr className={classes['hierarchy-column-header']}>
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
