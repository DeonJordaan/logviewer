import classes from './TaskViewHeader.module.css';

const TaskViewHeader = () => {
	return (
		<div className={classes['task-header']}>
			<div>Host</div>
			<div>Application</div>
			<div>Status</div>
			<div>Task Code</div>
			<div>Started</div>
			<div>Completed</div>
			<div>Sub-Events</div>
			<div>ID</div>
			<div>Message</div>
		</div>
	);
};

export default TaskViewHeader;
