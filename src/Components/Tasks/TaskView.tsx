import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import eventSlice from '../../store/event-slice';

import { Table, Thead, Tbody, Tr, Td, Th } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import Event from '../../types/event';
// import TaskViewHeader from './TaskViewHeader';
import TaskViewItem from './TaskViewItem';

import classes from './TaskView.module.css';

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
		const to: number = 10 * pageNumber;
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
	}, [events, eventsByDate, pageNumber]);

	let taskContent = (
		<Tbody>
			<Tr>
				<Td>No event selected</Td>
			</Tr>
		</Tbody>
	);

	if (displayData) {
		taskContent = (
			<Tbody>
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
			</Tbody>
		);
	}

	// TODO IMPLEMENT ERROR HANDLING STATES
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

	return (
		<div className={classes['task-view']}>
			<h3 className={classes['task-header']}>Event Data</h3>
			<Table>
				<Thead>
					<Tr className={classes['task-view-header']}>
						<Th>Host</Th>
						<Th>Application</Th>
						<Th>Status</Th>
						<Th>Task Code</Th>
						<Th>Started</Th>
						<Th>Completed</Th>
						<Th>Sub-Events</Th>
						<Th>ID</Th>
						<Th>Message</Th>
					</Tr>
					{/* <TaskViewHeader /> */}
				</Thead>
				<>{taskContent}</>
			</Table>
		</div>
	);
};

export default React.memo(TaskView);
