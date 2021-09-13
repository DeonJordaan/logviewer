import classes from './Button.module.css';

const Button = (props) => {
	const importedClasses = classes['arrow-button'];
	const buttonClasses = `${importedClasses} ` + props.className;

	return (
		<button
			onClick={props.onClick}
			type="button"
			className={`${buttonClasses}`}
			// className={buttonClasses}
		></button>
	);
};

export default Button;

// const Button = (props) => {
// 	const classes = '{classes['arrow-button']} '+ props.className;

// 	return (
// 		<button
// 			onClick={props.onClick}
// 			type="button"
// 			className={classes}
// 		></button>
// 	);
// };
