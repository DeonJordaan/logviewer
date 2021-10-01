import { useContext } from 'react';

import EventContext from '../../store/event-context';

import classes from './TotalRecordCount.module.css';

const TotalRecordCount = (props) => {
	const eventCtx = useContext(EventContext);

	return (
		<div className={classes['total-records']}>
			<div>Total Records Available:</div>
			<div>{eventCtx.totalRecordCount}</div>
		</div>
	);
};

export default TotalRecordCount;
