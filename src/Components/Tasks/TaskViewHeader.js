import classes from './TaskViewHeader.module.css';

const TaskViewHeader = () => {
	return (
		<tr className={classes['task-header']}>
			<td>Host</td>
			<td>Application</td>
			<td>Status</td>
			<td>Task Code</td>
			<td>Started</td>
			<td>Completed</td>
			<td>Sub-Events</td>
			<td>ID</td>
			<td>Message</td>
		</tr>
	);
};

export default TaskViewHeader;
