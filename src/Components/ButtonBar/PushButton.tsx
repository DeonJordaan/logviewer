import React from 'react';

// import EventContext from '../../store/event-context';

import classes from './PushButton.module.css';

const PushButton: React.FC<React.HTMLAttributes<any>> = (props) => {
	// const eventCtx = useContext(EventContext);

	return (
		<button
			// onClick={eventCtx.getEventData} FIXME NEED TO FIND A WAY TO ACTIVATE THIS FETCH REQUEST SINCE I NO LONGER ACTIVATE MY FETCH REQUEST FROM A FUNCTION THAT COULD ALSO BE TRIGGERED FROM THIS BUTTON
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
