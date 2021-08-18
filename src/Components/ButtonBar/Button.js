import './Button.css';

const Button = (props) => {
	const classes = 'arrow-button ' + props.className;

	return (
		<button
			onClick={props.onClick}
			type="button"
			className={classes}
		></button>
	);
};

export default Button;
