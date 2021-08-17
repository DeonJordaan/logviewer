const TaskTime = (props) => {
	// const taskTime = props.time + 'Z';

	const [date, time] = props.time.split('T');

	// const roundedTime = parseInt(time);
	console.log(Number(time));

	return (
		<div>
			{date} {time}
			{/* {taskTime} */}
		</div>
	);
};

export default TaskTime;
