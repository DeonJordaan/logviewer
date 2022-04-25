import React from 'react';

import classes from './Button.module.css';

const Button: React.FC<{
	onClick: (event: React.MouseEvent) => void;
}> = (props) => {

	return (
		<button
			onClick={props.onClick}
			type="button"
			className={classes['arrow-button']}
		></button>
	);
};

export default Button;
