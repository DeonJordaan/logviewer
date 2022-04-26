import classes from './TaskViewHeader.module.css';

import { Th } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const TaskViewHeader: React.FC = () => {
	return (
		<tr className={classes['task-view-header']}>
			<Th className="host">Host</Th>
			<Th className="application">Application</Th>
			<Th className="status">Status</Th>
			<Th className="taskcode">Task Code</Th>
			<Th className="started">Started</Th>
			<Th className="completed">Completed</Th>
			<Th className="subevents">Sub-Events</Th>
			<Th className="id">ID</Th>
			<Th className="message">Message</Th>
		</tr>
	);
};

export default TaskViewHeader;
