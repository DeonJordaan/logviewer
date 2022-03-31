import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import DataInterface from '../types/dataInterface';
import Event from '../types/event';
import db from './firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
// import { usePapaParse } from 'react-papaparse';

type EventContextObject = {
	tasks: Event[];
	isLoading: boolean;
	// error: string | null;
	totalRecordCount: number;
	totalPageCount: number;
	pageNumber: number;
	setPageNumber: Dispatch<SetStateAction<number>>;
	displayData: Event[];
};

const EventContext = React.createContext<EventContextObject>({
	tasks: [],
	isLoading: false,
	// error: null,
	totalRecordCount: 0,
	totalPageCount: 0,
	pageNumber: 1,
	setPageNumber: () => {},
	displayData: [],
});

export const EventContextProvider: React.FC = (props) => {
	const [tasks, setTasks] = useState<Event[]>([]);
	const [totalRecordCount, setTotalRecordCount] = useState<number>(0);
	const [totalPageCount, setTotalPageCount] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [displayData, setDisplayData] = useState<Event[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// const [error, setError] = useState<boolean>(false);

	//CMNT Fetch data, sort and set tasks

	const getEvents = async () => {
		setIsLoading(true);
		let taskData: DataInterface[] = [];

		const eventsRef = collection(db, 'events');

		const querySnapshot = await getDocs(eventsRef);

		querySnapshot.forEach((doc) => taskData.push(doc.get('event')));

		const allTasks = taskData.map((data) => new Event(data));

		setTasks(allTasks);
		setIsLoading(false);
	};

	//FIXMETODO
	// useEffect(() => {
	// 	getEvents();
	// }, []);

	const getPagination = async () => {
		const paginationRef = collection(db, 'pagination');
		const paginationSnapshot = await getDocs(paginationRef);

		paginationSnapshot.forEach((doc) => {
			const totalRecordCount = doc.get('totalRecordCount');
			const pageSize = doc.get('pageSize');
			setTotalRecordCount(totalRecordCount);
			setTotalPageCount(Math.ceil(totalRecordCount / pageSize));
		});
	};
	getPagination();

	//FIXMETODO
	// useEffect(() => {
	// 	const from: number = ((0 + 1) * pageNumber - 1) * 10;
	// 	// console.log(from);
	// 	const to: number = 10 * pageNumber;
	// 	// console.log(to);
	// 	const setDisplayPage = (data: Event[]) => {
	// 		setDisplayData(
	// 			data.slice(
	// 				`${from}` as unknown as number,
	// 				`${to}` as unknown as number
	// 			)
	// 		);
	// 	};

	// 	setDisplayPage(tasks);
	// }, [pageNumber, tasks]);

	// FIXMEFIXMEFIXME;
	// const eventURL =
	// 'C:/Users/Deon/Documents/GitHub/logViewer/logviewer/public/maineventdata.csv';
	// const eventURL = '../public/maineventdata.csv';

	// useEffect(() => {
	// 	const ReadRemoteFile = () => {
	// 		const { readRemoteFile } = usePapaParse();

	// 		const handleReadRemoteFile = () => {
	// 			readRemoteFile(eventURL, {
	// 				complete: (results) => {
	// 					console.log('---------------------------');
	// 					console.log('Results:', results);
	// 					console.log('---------------------------');
	// 				},
	// 				download: true,
	// 				header: true,
	// 			});
	// 		};
	// 		handleReadRemoteFile();
	// 	};
	// 	ReadRemoteFile();
	// }, []);
	//FIXMEFIXMEFIXME

	// NOTE PULL UPDATED EVENTS/SUBEVENTS DATA FROM JSON FILES AND PUSH THEM INTO FIREBASE
	// let events = require('./events.json');
	// let subevents = require('./subevents.json');
	// console.log(events);

	// // OPEN REVISED METHOD USING setDoc TO WRITE EVENTS TO FIRESTORE COLLECTION
	// useEffect(() => {
	// 	events.forEach((event: Event) => {
	// 		setDoc(doc(db, 'events', `${event.Id}`), { event });
	// 		// console.log(event.Id);
	// 	});
	// }, [events]);

	// useEffect(() => {
	// 	subevents.forEach((event: Event) => {
	// 		setDoc(doc(db, 'subEvents', `${event.Id}`), { event });
	// 		// console.log(event.Id);
	// 	});
	// }, [subevents]);

	// useEffect(() => {
	// 	subEvents.forEach((event) => {
	// 		setDoc(doc(db, 'subEvents', `${event.id}`), { event });
	// 	});
	// }, [subEvents]);
	// CLOSE

	//FIXMETODO
	// useEffect(() => {
	// 	setTotalPageCount(Math.ceil(totalRecordCount / 10));
	// }, [totalRecordCount]);

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
				// error: error,
				totalRecordCount: totalRecordCount,
				totalPageCount: totalPageCount,
				pageNumber: pageNumber,
				setPageNumber: setPageNumber,
				displayData: displayData,
			}}
		>
			{props.children}
		</EventContext.Provider>
	);
};

export default EventContext;

// OPEN OPEN OPENFETCH API FUNCTION USING USEFETCH HOOK
// useEffect(() => {
// 	const transformData = (taskData: {
// 		TotalRecordCount: number;
// 		Data: DataInterface[];
// 	}) => {
// 		const { Data: allTaskData, TotalRecordCount: recordCount } =
// 			taskData;

// 		// CMNT const allTasks = allTaskData.map((data) => new Event(data));
// 		const allTasks = allTaskData.map((taskData) => {
// 			return {
// 				key: taskData.Id,
// 				id: taskData.Id,
// 				App: 'Application Name',
// 				taskCode: 'Event Code',
// 				startTime: taskData.Started,
// 				endTime: taskData.Completed,
// 				subEvents: taskData.SubEventCount,
// 				host: 'Application Host',
// 				message: 'Event Message',
// 				status: taskData.Status,
// 				parentId: taskData.ParentId,
// 			};
// 		});

// 		setTasks(allTasks);
// 		setTotalRecordCount(recordCount);
// 	};

// 	// CMNT appName options for URL below
// 	// SalesActivityReport
// 	// MetroIQ
// 	// AgentIQ
// 	// PropIQ
// 	// SACompany
// 	fetchTasks(
// 		{
// 			url: `http://logviewer.jordaan/api/LogData/GetLogPage?appName=&minDate=&pageNo=${pageNumber}&pageSize=10&hostname=`,
// 		},
// 		transformData
// 	);
// }, [fetchTasks, pageNumber]);
// CLOSE CLOSE CLOSE

//OPEN
// CMNT Original method of sending data to firestore
// const eventStore = collection(db, 'events');

// useEffect(() => {
// 	tasks.forEach((event) => {
// 		addDoc(eventStore, { event });
// 	});
// }, [tasks]);
//CLOSE

// OPEN VIA I THINK FIREBASE'S OWN YOUTUBE TUTORIAL
// const getEvents = async () => {
// 	const firstPage = query(eventsRef, orderBy('id'), limit(10));
// 	const documentSnapshots = await getDocs(firstPage);

// 	const lastPage =
// 		documentSnapshots.docs[documentSnapshots.docs.length - 1];

// 	const nextPage = query(
// 		eventsRef,
// 		orderBy('id'),
// 		startAfter(lastPage),
// 		limit(10)
// 	);
// };
// CLOSE

//OPEN VIA FIRESHIP TUTORIAL NOTE OLD V8 FIRESTORE
// const query = ref.orderBy(field).limit(pageSize)

//function nextPage(last){
// return ref.orderBy(field).startAfter(last[field]).limit(pageSize)
// }

//function prevPage(first){
// return ref.orderBy(field).endBefore(first[field]).limitToLast(pageSize)
// }
//CLOSE

// OPEN PAGINATION FUNCTIONS
// const firstPageQuery = query(
// 	collection(db, 'events'),
// 	orderBy('event.id'),
// 	limit(10)
// );
// const firstPgSnapshot = await getDocs(firstPageQuery);
// firstPgSnapshot.forEach((doc) => taskData.push(doc.get('event')));

// const lastDoc = firstPgSnapshot.docs[firstPgSnapshot.docs.length - 1];
// console.log('last', lastDoc);

// const nextPgQuery = query(
// 	eventsRef,
// 	orderBy('id'),
// 	startAfter(lastDoc),
// 	limit(10)
// );
// CLOSE

//OPEN
// const getEvents = async () => {
// 	const q = query(eventsRef, where('parentId', '==', '15000'));

// 	const querySnapshot = await getDocs(q);
// 	querySnapshot.forEach((doc) => {
// 		console.log(doc.data());
// 	});
// };
//CLOSE

// NOTE REALTIME DATABASE SETTING FUNCTION
// useEffect(() => {
// 	tasks.forEach((event) => {
// 		set(ref(db, 'events/' + event.id), {
// 			event,
// 		});
// 	});
// }, [tasks]);

///////////////////////////
// NOTE ALTERNATE DATA
// key: data.Id,
// 						id: data.Id,
// 						App: data.AppName,
// 						taskCode: data.Code,
// 						startTime: data.Started,
// 						endTime: data.Completed,
// 						subEvents: data.SubEventCount,
// 						host: data.Host,
// 						message: data.Message,
// 						status: data.Status,

////////////////////////////////////

// const eventStore = doc(db, 'events/{data.id}');
// const fbData = []
// const fbase = fbData.push(allTaskData.map((data) => {
// 	key: data.id;
// 				id: data.id;
// 				App: data.App;
// 				taskCode: data.taskCode;
// 				startTime: data.startTime;
// 				endTime: data.endTime;
// 				subEvents: data.subEvents;
// 				host: data.host;
// 				message: data.message;
// 				status: data.status;
// 		}))

// 	function writeEvents() {

// 		setDoc(eventStore, eventData);
// 	}
// 	writeEvents();
// });

/////////////////////////////////////

// NOTE FUNCTION USED BEFORE SETTASKS TO SET GENERIC DATA TO STATE AS OPPOSED TO LEXISNEXIS DATA
// const allTasks = allTaskData.map((taskData) => {
// 	return {
// 		key: taskData.Id,
// 		id: taskData.Id,
// 		App: 'Application Name',
// 		taskCode: 'Event Code',
// 		startTime: taskData.Started,
// 		endTime: taskData.Completed,
// 		subEvents: taskData.SubEventCount,
// 		host: 'Application Host',
// 		message: 'Event Message',
// 		status: taskData.Status,
// 	};
// });

////////////////////////////////////
// EXAMPLE FROM STOCK MANAGER - INCORRECT FOR REALTIME DB
// const pushFirebase = allTaskData.map((data) => {
// 	set(ref(database, 'events/' + uuid), {
// 		key: uuid,
// 		id: uuid,
// 		productName: productNameUpperCase,
// 		description,
// 		prices: [],
// 		averagePrice: 0,
// 		quantity: 0,
// 	});
// })

// FIRESTORE VERSION BASED ON ABOVE EXAMPLE FROM STOCK MANAGER
// set(ref(database, 'events/' + data.Id), {
// 	key: data.Id,
// 	id: data.Id,
// 	App: data.AppName,
// 	taskCode: data.Code,
// 	startTime: data.Started,
// 	endTime: data.Completed,
// 	subEvents: data.SubEventCount,
// 	host: data.Host,
// 	message: data.Message,
// 	status: data.Status,
// });
