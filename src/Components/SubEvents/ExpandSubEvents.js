import './ExpandSubEvents.css';

const ExpandSubEvents = (props) => {
	let classes = 'sub-events';

	if (props.subEvents === 0) {
		classes = 'no-sub-events';
	}
	// console.log(classes);

	return <button className={classes}>{props.subEvents}</button>;
};

export default ExpandSubEvents;
