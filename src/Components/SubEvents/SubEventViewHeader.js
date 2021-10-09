import classes from './SubEventViewHeader.module.css';

const SubEventViewHeader = () => {
	return (
		<div className={classes['sub-event-column-header']}>
			<div>Status</div>
			<div>Sub-Events</div>
			<div>Started</div>
			<div>Completed</div>
			<div>ID</div>
			<div>Message</div>
		</div>
	);
};

export default SubEventViewHeader;
