import classes from './TaskViewHeader.module.css';

const TaskViewHeader: React.FC = () => {
	return (
		<tr className={classes['task-header']}>
			<th className="host">Host</th>
			<th className="application">Application</th>
			<th className="status">Status</th>
			<th className="taskcode">Task Code</th>
			<th className="started">Started</th>
			<th className="completed">Completed</th>
			<th className="subevents">Sub-Events</th>
			<th className="id">ID</th>
			<th className="message">Message</th>
		</tr>
	);
};

export default TaskViewHeader;
