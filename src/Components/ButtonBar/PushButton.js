import classes from './PushButton.module.css';

const PushButton = (props) => {
	return (
		<button
			onClick={props.onClick}
			id="submitbutton"
			type="button"
			className={`${classes.btn} ${classes['push-button']}`}
		>
			<span className={classes.shadow}></span>
			<span className={classes.edge}></span>
			<span className={classes.front}>Fetch Data!</span>
		</button>
	);
};

export default PushButton;
