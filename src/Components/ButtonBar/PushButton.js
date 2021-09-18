import React, { useContext } from 'react';

import EventContext from '../../Context/event-context';

import classes from './PushButton.module.css';

const PushButton = (props) => {
	const eventCtx = useContext(EventContext);

	return (
		<button
			onClick={eventCtx.getEventData}
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
