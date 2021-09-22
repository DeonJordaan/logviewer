import React from 'react';
import classes from './HierarchyViewColumnHeader.module.css';

const HierarchyViewColumnHeader = () => {
	return (
		<div className={classes['hierarchy-column-header']}>
			<div>Status</div>
			<div>Sub-Events</div>
			<div>Started</div>
			<div>Completed</div>
			<div>Message</div>
		</div>
	);
};

export default HierarchyViewColumnHeader;
