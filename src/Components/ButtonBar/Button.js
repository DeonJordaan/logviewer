import classes from './Button.module.css';

const Button = (props) => {
	const buttonClasses = classes['arrow-button'];

	const paginationClasses = props.className;

	const classesMap = {
		doubleLeftArrow: classes.doubleLeftArrow,
		leftArrow: classes.leftArrow,
		rightArrow: classes.rightArrow,
		doubleRightArrow: classes.doubleRightArrow,
	};

	return (
		<button
			onClick={props.onClick}
			type="button"
			className={`${buttonClasses} ${classesMap[paginationClasses]}`}
		></button>
	);
};

export default Button;
