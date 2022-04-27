import React from 'react';

import { useAppDispatch } from '../../store/hooks';
import { subEventActions } from '../../store/subevent-slice';
import { CaretCircleUp } from 'phosphor-react';

import TaskTime from '../Tasks/TaskTime';

import classes from './HierarchyViewItem.module.css';

const HierarchyViewItem: React.FC<{
	subEvents: number;
	status: string;
	startTime: string;
	endTime: string;
	id: number;
	message: string;
}> = (props) => {
	const dispatch = useAppDispatch();
	const id = props.id;

	function setClasses(taskStatus: string) {
		let taskClass = '';
		switch (taskStatus) {
			case 'NotSet': {
				taskClass = 'classes.NotSet';
				break;
			}
			case 'Started': {
				taskClass = 'classes.Started';
				break;
			}
			case 'Completed': {
				taskClass = 'classes.Completed';
				break;
			}
			case 'Aborted': {
				taskClass = 'classes.Aborted';
				break;
			}
			case 'Failed': {
				taskClass = 'classes.Failed';
				break;
			}
		}
		return taskClass;
	}

	const levelUp = () => {
		dispatch(subEventActions.LEVELUP_HIERARCHY(id));
	};

	return (
		<tr className={classes['hierarchy-item']}>
			<td>
				<button
					type="button"
					onClick={levelUp}
					className={classes.upArrow}
				>
					<CaretCircleUp />
				</button>
			</td>
			<td className={setClasses(props.status)}>{props.status}</td>
			<td>{props.subEvents}</td>
			<td>
				<TaskTime time={props.startTime} />
			</td>
			<td>
				<TaskTime time={props.endTime} />
			</td>
			<td>{id}</td>
			<td>{props.message}</td>
		</tr>
	);
};

export default React.memo(HierarchyViewItem);

//NOTE Mapping classes - cannot resolve type settings
// const classesMap = {
// 	NotSet: classes.NotSet,
// 	Started: classes.Started,
// 	Completed: classes.Completed,
// 	Aborted: classes.Aborted,
// 	Failed: classes.Failed,
// };
