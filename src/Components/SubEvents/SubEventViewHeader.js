import classes from './SubEventViewHeader.module.css';

const SubEventViewHeader = () => {
	return (
		<tr className={classes['sub-event-column-header']}>
			<th>Status</th>
			<th>Sub-Events</th>
			<th>Started</th>
			<th>Completed</th>
			<th>ID</th>
			<th>Message</th>
		</tr>
	);
};

export default SubEventViewHeader;
