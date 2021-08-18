const TaskTime = (props) => {
	const [date, time] = props.time.split('T');

	const roundedTime = time.substring(0, 8);

	return (
		<div>
			{date} at {roundedTime}
		</div>
	);
};

export default TaskTime;
