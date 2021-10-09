import React from 'react';

import classes from './HierarchyViewHeader.module.css';

const HierarchyViewHeader = () => {
	return (
		<tr className={classes['hierarchy-column-header']}>
			<td>Status</td>
			<td>Sub-Events</td>
			<td>Started</td>
			<td>Completed</td>
			<td>Message</td>
		</tr>
	);
};

export default HierarchyViewHeader;
