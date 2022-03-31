import React from 'react';

const TaskTime: React.FC<{
	time: string;
}> = (props) => {
	let timeStamp = '0000-00-00 00:00:00.00';

	if (props.time) {
		timeStamp = props.time;
	}

	const [date, time] = timeStamp.split(' ');

	const roundedTime = time.substring(0, 8);

	return (
		<>
			{date} at {roundedTime}
		</>
	);
};

export default TaskTime;
