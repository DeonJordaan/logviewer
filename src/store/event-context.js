import React, { useEffect, useState, useCallback, useReducer } from 'react';

import LogDataWorker from './LogDataWorker';

//TODO SUGGESTION
// const EventContext = React.createContext({
// 	dataWorkerInstance: LogDataWorker,
// });

const EventContext = React.createContext({
	tasks: LogDataWorker.tasks,
	subEvents: [],
	isLoading: false,
	error: null,
	isLoadingSubEvents: false,
	subEventError: null,
	totalRecordCount: [],
	pageNumber: 1,
	parentId: 1,
	selectedTask: [],
	hierarchy: [],
	getEventData: () => {},
	getSubEventData: () => {},
	setParentId: () => {},
	dispatchPageNumber: () => {},
	setHierarchy: () => {},
	setSelectedTask: () => {},
});

export const EventContextProvider = (props) => {
	return (
		<EventContext.Provider
			value={{
				tasks: dataworker.tasks,
				subEvents: dataworker.subEvents,
				isLoading: dataworker.isLoading,
				error: dataworker.error,
				isLoadingSubEvents: dataworker.isLoadingSubEvents,
				subEventError: dataworker.subEventError,
				totalRecordCount: dataworker.totalRecordCount,
				getEventData: dataworker.getEventData,
				getSubEventData: dataworker.getSubEventData,
				// setPageNumber: setPageNumber, //TODO DELETE ONCE PAGINATION WORKING
				pageNumber: pageNumber.page,
				dispatchPageNumber: dispatchPageNumber, //NOTE WHILE ATTEMPTING REDUCER
				parentId: dataworker.parentId,
				setParentId: dataworker.setParentId,
				hierarchy: dataworker.hierarchy,
				setHierarchy: dataworker.setHierarchy,
				selectedTask: dataworker.selectedTask,
				setSelectedTask: dataworker.setSelectedTask,
			}}
		>
			{props.children}
		</EventContext.Provider>
	);
};

export default EventContext;

//////////////////////////////////////
// useEffect(() => {
// 	setTasks(INITIAL_TASKS);
// 	setSelectedTask(tasks);
// 	setHierarchy(selectedTask);
// }, []);

//NOTE SETTING HIERARCHY
// const selectedTask = tasks.filter((task) => task.id === parseInt(parentId));

// console.log(selectedTask);
// const hierarchy = [];

// FIXME Trying to get setHierarchy to work via useMemo
// let selectedTask = useMemo(() => {
// 	return [];
// }, []);

// useEffect(() => {
// 	setSelectedTask(
// 		tasks?.filter((task) => task.id === parseInt(parentId))
// 	);
// }, [parentId, tasks]);
// const selectedTaskHandler = useCallback(() => {
// 	tasks.filter((task) => task.id === parseInt(parentId));
// 	// 	console.log(parentId);
// }, [tasks, parentId]);

// useEffect(() => {
// 	setHierarchy(() => {
// 		return {selectedTask}}), [selectedTask]);
