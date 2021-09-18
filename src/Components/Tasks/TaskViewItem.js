import ExpandSubEvents from '../SubEvents/ExpandSubEvents';
import TaskTime from './TaskTime';

import classes from './TaskViewItem.module.css';

const TaskViewItem = (props) => {
	//TODO PERHAPS I'M DOING THIS CLASSES THING ALL WRONG...? MUST THEY BE DECALRED WITH 'classes.whatever' ALL THE TIME...?
	//FIXME Should I remove all the other classes? I'm probably not going to ever need them.

	const status = props.status;

	const classesMap = {
		NotSet: classes.NotSet,
		Started: classes.Started,
		Completed: classes.Completed,
		Aborted: classes.Aborted,
		Failed: classes.Failed,
	};

	return (
		<li className={classes['task-item']}>
			<div className={'host'}>{props.host}</div>
			<div className={'app'}>{props.app}</div>
			<div className={classesMap[status]}>{props.status}</div>
			<div className={'code'}>{props.taskCode}</div>
			<TaskTime time={props.startTime} />
			<TaskTime time={props.endTime} />
			<ExpandSubEvents
				id={props.id}
				subEvents={props.subEvents}
				// onGetSubEvents={props.getSubEvents}
			/>
			<div className={'id'}>{props.id}</div>
			<div className={'message'}>{props.message}</div>
		</li>
	);
};

export default TaskViewItem;
