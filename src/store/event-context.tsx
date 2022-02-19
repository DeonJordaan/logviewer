import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import useFetch from './useFetch';
import DataInterface from '../types/dataInterface';
import Event from '../types/event';

type EventContextObject = {
	tasks: Event[];
	isLoading: boolean;
	error: string | null;
	totalRecordCount: number;
	totalPageCount: number;
	pageNumber: number;
	setPageNumber: Dispatch<SetStateAction<number>>;
};

const EventContext = React.createContext<EventContextObject>({
	tasks: [],
	isLoading: false,
	error: null,
	totalRecordCount: 0,
	totalPageCount: 0,
	pageNumber: 1,
	setPageNumber: () => {},
});

export const EventContextProvider: React.FC = (props) => {
	const [tasks, setTasks] = useState<Event[]>([]);
	const [totalRecordCount, setTotalRecordCount] = useState<number>(0);
	const [totalPageCount, setTotalPageCount] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState(1);

	//COMMENT Fetch data, sort and set tasks
	const { isLoading, error, sendRequest: fetchTasks } = useFetch();

	useEffect(() => {
		const transformData = (taskData: {
			TotalRecordCount: number;
			Data: DataInterface[];
		}) => {
			const { Data: allTaskData, TotalRecordCount: recordCount } =
				taskData;
			// TODO PUSH ALL DATA TO FIREBASE HERE
			// NOTE ANY PREP NECESSARY HERE IN ORDER TO PUSH SUBEVENTS LATER?

			const allTasks = allTaskData.map((data) => new Event(data));

			setTasks(allTasks);
			setTotalRecordCount(recordCount);
		};

		// NOTE appName options for URL below
		// SalesActivityReport
		// MetroIQ
		// AgentIQ
		// PropIQ
		// SACompany
		fetchTasks(
			{
				url: `http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber}&pageSize=10&hostname=`,
			},
			transformData
		);
	}, [fetchTasks, pageNumber]);

	useEffect(() => {
		setTotalPageCount(Math.ceil(totalRecordCount / 10));
	}, [totalRecordCount]);

	// TODO Try and get the context value to work to use in the EventContext.Provider value
	// const contextValue: EventContextObject = {
	// 	tasks: tasks,
	// 	isLoading: isLoading,
	// 	error: error,
	// 	totalRecordCount: totalRecordCount,
	// 	pageNumber: pageNumber.page,
	// 	dispatchPageNumber: dispatchPageNumber,
	// };

	return (
		<EventContext.Provider
			value={{
				tasks: tasks,
				isLoading: isLoading,
				error: error,
				totalRecordCount: totalRecordCount,
				totalPageCount: totalPageCount,
				pageNumber: pageNumber,
				setPageNumber: setPageNumber,
			}}
		>
			{props.children}
		</EventContext.Provider>
	);
};

export default EventContext;
