import './Button.css';

const Button = (props) => {
	const classes = 'arrow-button ' + props.className;

	return <button type="button" className={classes}></button>;
};

export default Button;
