import './TaskViewHeader.css';

// import GridHeader from '../UI/GridHeader';

const TaskViewHeader = () => {
	return (
		<div className="task-header">
			<div>Host</div>
			{/* <div>Task ID</div> */}
			<div>Application</div>
			<div>Task Code</div>
			<div>Started</div>
			<div>Completed</div>
			<div>Sub-Events</div>
			<div>Message</div>
		</div>
	);
};

export default TaskViewHeader;
