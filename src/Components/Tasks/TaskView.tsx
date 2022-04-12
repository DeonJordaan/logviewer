import React, { useEffect, useState } from 'react';
import TaskViewHeader from './TaskViewHeader';
import TaskViewItem from './TaskViewItem';
import classes from './TaskView.module.css';
import Event from '../../types/event';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import eventSlice from '../../store/event-slice';

// import { doc, setDoc } from 'firebase/firestore';
// import db from '../../store/firebase';

const TaskView: React.FC<{
	setStatus: (statusCode: number) => string;
}> = (props) => {
	const dispatch = useAppDispatch();

	const { events, date } = useAppSelector((state) => state.events);
	const { pageNumber } = useAppSelector((state) => state.pagination);

	const [eventsByDate, setEventsByDate] = useState<Event[]>();
	const [displayData, setDisplayData] = useState<Event[]>();

	const parseDate = (date: string | number) => {
		const dateToParse = new Date(date);
		const parsedDate = dateToParse.getTime();
		return parsedDate;
	};

	useEffect(() => {
		const filterDataByDate = (data: Event[]) => {
			if (data) {
				setEventsByDate(
					data.filter(
						(event) => parseDate(event.EndTime) <= parseDate(date)
					)
				);
			}
		};
		filterDataByDate(events);
	}, [date, events]);

	useEffect(() => {
		if (eventsByDate && eventsByDate.length > 0) {
			const eventsDataLength = eventsByDate!.length;
			dispatch(
				eventSlice.actions.SET_TOTAL_RECORD_COUNT(eventsDataLength)
			);
		}
	}, [dispatch, eventsByDate]);

	useEffect(() => {
		const from: number = ((0 + 1) * pageNumber - 1) * 10;
		// console.log(from);
		const to: number = 10 * pageNumber;
		// console.log(to);
		const setDisplayPage = (data: Event[] | undefined) => {
			if (data) {
				setDisplayData(
					data.slice(
						`${from}` as unknown as number,
						`${to}` as unknown as number
					)
				);
			}
		};

		setDisplayPage(eventsByDate);
		// setDisplayPage(events);
	}, [events, eventsByDate, pageNumber]);

	let taskContent = (
		<tbody>
			<tr>
				<td>No event selected</td>
			</tr>
		</tbody>
	);

	if (displayData) {
		taskContent = (
			<tbody>
				{displayData.map((task: Event) => (
					<TaskViewItem
						key={task.Key}
						host={task.Host}
						id={task.Id}
						app={task.AppName}
						subEvents={task.EventCount}
						taskCode={task.EventName}
						startTime={task.StartTime}
						endTime={task.EndTime}
						message={task.Message}
						status={props.setStatus(+task.StatusId)}
					/>
				))}
			</tbody>
		);
	}

	// if (eventCtx.error) {
	// 	taskContent = (
	// 		<tbody>
	// 			<tr>
	// 				<td>{eventCtx.error}</td>
	// 			</tr>
	// 		</tbody>
	// 	);
	// }

	// if (eventCtx.isLoading) {
	// 	taskContent = (
	// 		<tbody>
	// 			<tr>
	// 				<td>Loading...</td>
	// 			</tr>
	// 		</tbody>
	// 	);
	// }

	// const eventStore = doc(db, 'events/{data.id}');
	// const fbData: {
	// 	key: data.id;
	// 	id: data.id;
	// 	App: data.App;
	// 	taskCode: data.taskCode;
	// 	startTime: data.startTime;
	// 	endTime: data.endTime;
	// 	subEvents: data.subEvents;
	// 	host: data.host;
	// 	message: data.message;
	// 	status: data.status;
	// } = [];
	// const fbase = () => {
	// 	fbData.push(
	// 		eventCtx.tasks.map((data) => {
	// 			return {
	// 				key: data.id,
	// 				id: data.id,
	// 				App: data.App,
	// 				taskCode: data.taskCode,
	// 				startTime: data.startTime,
	// 				endTime: data.endTime,
	// 				subEvents: data.subEvents,
	// 				host: data.host,
	// 				message: data.message,
	// 				status: data.status,
	// 			};
	// 		})
	// 	);
	// };
	// fbase();

	// const writeEvents = () => {
	// 	setDoc(eventStore, fbData);
	// };
	// writeEvents();

	return (
		<div className={classes['task-view']}>
			<h3 className={classes['task-header']}>Event Data</h3>
			<table>
				<thead>
					<TaskViewHeader />
				</thead>
				<>{taskContent}</>
			</table>
		</div>
	);
};

export default React.memo(TaskView);
