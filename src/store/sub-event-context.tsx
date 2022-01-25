import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import useFetch from './useFetch';

import Event from '../types/event';

import DataInterface from '../types/dataInterface';

type SubEventContextObject = {
	error: string | null;
	isLoading: boolean;
	selectedTask: Event[];
	subEvents: Event[];
	selectedSubEvent: Event[];
	hierarchy: Event[];
	parentId: number;
	subEventParentId: number;
	setParentId: Dispatch<SetStateAction<number>>;
	setSubEventParentId: Dispatch<SetStateAction<number>>;
	setHierarchy: Dispatch<SetStateAction<Event[]>>;
	setSelectedTask: Dispatch<SetStateAction<Event[]>>;
	setSelectedSubEvent: Dispatch<SetStateAction<Event[]>>;
};

const SubEventContext = React.createContext<SubEventContextObject>({
	error: null,
	isLoading: false,
	selectedTask: [],
	subEvents: [],
	selectedSubEvent: [],
	hierarchy: [],
	parentId: 0,
	subEventParentId: 0,
	setParentId: () => [],
	setSubEventParentId: () => [],
	setHierarchy: () => [],
	setSelectedTask: () => [],
	setSelectedSubEvent: () => [],
});

export const SubEventContextProvider: React.FC = (props) => {
	const [subEvents, setSubEvents] = useState<Event[]>([]);

	const [parentId, setParentId] = useState(0);

	const [subEventParentId, setSubEventParentId] = useState(0);

	const [selectedTask, setSelectedTask] = useState<Event[]>([]);

	const [selectedSubEvent, setSelectedSubEvent] = useState<Event[]>([]);

	const [hierarchy, setHierarchy] = useState<Event[]>([]);

	// NOTE SETTING HIERARCHY
	useEffect(() => {
		setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
	}, [selectedSubEvent]);

	//COMMENT Fetch data, sort and set subEvents
	const { isLoading, error, sendRequest: fetchTasks } = useFetch();

	useEffect(() => {
		const transformData = (taskData: {
			TotalRecordCount: number;
			Data: DataInterface[];
			PageNumber: number;
		}) => {
			const { Data: allTaskData } = taskData;

			const allTasks = allTaskData.map((data) => new Event(data));

			setSubEvents(allTasks);
		};

		fetchTasks(
			{
				url: `http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`,
			},
			transformData
		);
	}, [fetchTasks, parentId]);

	return (
		<SubEventContext.Provider
			value={{
				subEvents: subEvents,
				isLoading: isLoading,
				error: error,
				parentId: parentId,
				setParentId: setParentId,
				subEventParentId: subEventParentId,
				setSubEventParentId: setSubEventParentId,
				hierarchy: hierarchy,
				setHierarchy: setHierarchy,
				selectedTask: selectedTask,
				setSelectedTask: setSelectedTask,
				selectedSubEvent: selectedSubEvent,
				setSelectedSubEvent: setSelectedSubEvent,
			}}
		>
			{props.children}
		</SubEventContext.Provider>
	);
};

export default SubEventContext;

// NOTE DIFFERENT METHODS FOR SETTING HIERARCHY
// STANDARD STATE UPDATING FUNCTION
// useEffect(() => {
// 	setHierarchy((prevState) => [...prevState, ...selectedSubEvent]);
// }, [selectedSubEvent]);

// CHECKING PREVSTATE
// useEffect(() => {
// 	setHierarchy((prevState) =>
// 		prevState ? [...prevState, ...selectedSubEvent] : selectedSubEvent
// 	);
// }, [selectedSubEvent]);

// TYPECASTING PREVSTATE
// useEffect(() => {
// 	setHierarchy((prevState) => [
// 		...(prevState as Event[]),
// 		selectedSubEvent,
// 	]);
// }, [selectedSubEvent]);

// SINGLE SELECTED SUBEVENT
// useEffect(() => {
// 	setHierarchy(selectedSubEvent);
// }, [selectedSubEvent]);

///////////////////////////
//NOTE OLD GETSUBEVENT FUNCTION
//COMMENT Fetch data, sort and set subEvents
//NOTE Fetch sub-event data and extract selected event data to insert in hierarchy view
// const {
// 	data: subEventData,
// 	isLoading: subEventsLoading,
// 	error: subEventErrorIncoming,
// } = useFetch(
// 	`http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${parentId}`,
// 	{},
// 	[parentId]
// );
// console.log(subEventData);

// setIsLoadingSubEvents(subEventsLoading);
// setSubEventError(subEventErrorIncoming);

// const allSubEventData = subEventData.Data;
// console.log(allSubEventData);

// const subEventTasks = allSubEventData.map((taskData) => {
// 	return {
// 		key: taskData.Id,
// 		id: taskData.Id,
// 		app: taskData.AppName,
// 		taskCode: taskData.Code,
// 		startTime: taskData.Started,
// 		endTime: taskData.Completed,
// 		subEvents: taskData.SubEventCount,
// 		host: taskData.Host,
// 		message: taskData.Message,
// 		status: taskData.Status,
// 	};
// });
// setSubEvents(subEventTasks);
// setSelectedTask(tasks.filter((task) => task.id === parseInt(parentId)));
