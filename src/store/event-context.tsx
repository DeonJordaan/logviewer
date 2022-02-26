import React, {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useCallback,
} from 'react';
import useFetch from './useFetch';
import DataInterface from '../types/dataInterface';
import Event from '../types/event';
import db from './firebase';
import {
	setDoc,
	doc,
	query,
	collection,
	where,
	getDocs,
	orderBy,
	limit,
	startAfter,
	DocumentData,
	Query,
} from 'firebase/firestore';
// import { ref, set } from 'firebase/database'; // USED FOR REALTIME DB

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

	//CMNT Fetch data, sort and set tasks
	const { isLoading, error, sendRequest: fetchTasks } = useFetch();

	console.log(pageNumber);
	// const getEvents = useCallback(async () => {
	//OPEN
	// if (isLoading) {
	// 	return <Loading/>;
	// }
	//CLOSE
	// let taskData: DataInterface[] = [];
	// let lastDoc: unknown;
	// const eventsRef = collection(db, 'events');
	// let myQuery: Query;
	// // const querySnapshot = await getDocs(eventsRef);
	// // querySnapshot.forEach((doc) => taskData.push(doc.get('event')));
	// // OPEN PAGINATION FUNCTIONS
	// // const firstPage = async () => {
	// if (pageNumber === 1) {
	// 	myQuery = query(eventsRef, orderBy('event.id'), limit(10));
	// 	const firstPgSnapshot = await getDocs(myQuery);
	// 	firstPgSnapshot.forEach((doc) => taskData.push(doc.get('event')));
	// 	lastDoc = firstPgSnapshot.docs[firstPgSnapshot.docs.length - 1];
	// }
	// // firstPage();
	// if (pageNumber >= 2) {
	// 	// const nextPage = () => {
	// 	myQuery = query(
	// 		eventsRef,
	// 		orderBy('id'),
	// 		limit(10),
	// 		startAfter(lastDoc)
	// 	);
	// 	const nextPgSnapshot = await getDocs(myQuery);
	// 	nextPgSnapshot.forEach((doc) => taskData.push(doc.get('event')));
	// 	// };
	// }
	// CLOSE
	// 	const allTasks = taskData.map((data) => new Event(data));
	// 	setTasks(allTasks);
	// }, [pageNumber]);

	// useEffect(() => {
	// 	getEvents();
	// }, [pageNumber]);

	// useEffect(() => {
	// 	const getPagination = async () => {
	// 		const paginationRef = collection(db, 'pagination');

	// 		const paginationSnapshot = await getDocs(paginationRef);

	// 		paginationSnapshot.forEach((doc) => {
	// 			const totalRecordCount = doc.get('totalRecordCount');
	// 			const pageSize = doc.get('pageSize');
	// 			setTotalRecordCount(totalRecordCount);
	// 			setTotalPageCount(totalRecordCount / pageSize);
	// 			console.log(totalRecordCount);
	// 		});
	// 	};
	// 	getPagination();
	// }, []);

	// OPEN FETCH API FUNCTION USING USEFETCH HOOK
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
	// CLOSE

	// OPEN REVISED METHOD USING setDoc TO WRITE EVENTS TO FIRESTORE COLLECTION
	// useEffect(() => {
	// 	tasks.forEach((event) => {
	// 		setDoc(doc(db, 'events', `${event.id}`), { event });
	// 	});
	// }, [tasks]);
	// CLOSE

	// CMNT Original method of sending data to firestore
	// const eventStore = collection(db, 'events');

	// useEffect(() => {
	// 	tasks.forEach((event) => {
	// 		addDoc(eventStore, { event });
	// 	});
	// }, [tasks]);

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

//OPEN
// const getEvents = async () => {
// 	const q = query(eventsRef, where('parentId', '==', '15000'));

// 	const querySnapshot = await getDocs(q);
// 	querySnapshot.forEach((doc) => {
// 		console.log(doc.data());
// 	});
// };
//CLOSE

//OPEN PAGINATION VIA FIRESHIP
// const query = ref.orderBy(field).limit(pageSize)

//function nextPage(last){
// return ref.orderBy(field).startAfter(last[field]).limit(pageSize)
// }

//function prevPage(first){
// return ref.orderBy(field).endBefore(first[field]).limitToLast(pageSize)
// }

// VIA OTHER
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
