const TaskTime = (props) => {
	let timeStamp = '0000-00-00T00:00:00.00';

	if (props.time) {
		timeStamp = props.time;
	}

	const [date, time] = timeStamp.split('T');

	const roundedTime = time.substring(0, 8);

	return (
		<>
			{date} at {roundedTime}
		</>
	);
};

export default TaskTime;
