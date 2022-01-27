import classes from './TaskViewHeader.module.css';

const TaskViewHeader: React.FC = () => {
	return (
		<tr className={classes['task-header']}>
			<th>Host</th>
			<th>Application</th>
			<th>Status</th>
			<th>Task Code</th>
			<th>Started</th>
			<th>Completed</th>
			<th>Sub-Events</th>
			<th>ID</th>
			<th>Message</th>
		</tr>
	);
};

export default TaskViewHeader;
