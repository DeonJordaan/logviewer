import './TaskViewHeader.css';

// import GridHeader from '../UI/GridHeader';

const TaskViewHeader = () => {
	return (
		<div className="task-header">
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
