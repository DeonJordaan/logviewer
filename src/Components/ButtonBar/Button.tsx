import React from 'react';
import classes from './Button.module.css';

const Button: React.FC<{
	className: string;
	onClick: (event: React.MouseEvent) => void;
}> = (props) => {
	const buttonClasses = classes['arrow-button'];

	const paginationClasses = props.className;

	const classesMap: { [key: string]: string } = {
		doubleLeftArrow: classes.doubleLeftArrow,
		leftArrow: classes.leftArrow,
		rightArrow: classes.rightArrow,
		doubleRightArrow: classes.doubleRightArrow,
		upArrow: classes.upArrow,
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
