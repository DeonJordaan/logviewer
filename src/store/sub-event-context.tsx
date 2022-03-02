import React, {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useContext,
} from 'react';

import useFetch from './useFetch';
import EventContext from './event-context';
import DataInterface from '../types/dataInterface';
import Event from '../types/event';
import db from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

type SubEventContextObject = {
	error: string | null;
	isLoading: boolean;
	selectedTask: Event[];
	subEvents: Event[];
	selectedSubEvent: Event[];
	hierarchy: Event[];
	parentId: number;
	fetchId: number;
	subEventParentId: number;
	setParentId: Dispatch<SetStateAction<number>>;
	setFetchId: Dispatch<SetStateAction<number>>;
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
	fetchId: 0,
	subEventParentId: 0,
	setParentId: () => [],
	setFetchId: () => [],
	setSubEventParentId: () => [],
	setHierarchy: () => [],
	setSelectedTask: () => [],
	setSelectedSubEvent: () => [],
});

export const SubEventContextProvider: React.FC = (props) => {
	const [subEvents, setSubEvents] = useState<Event[]>([]);

	const [parentId, setParentId] = useState(0);

	const [fetchId, setFetchId] = useState(0);

	const [subEventParentId, setSubEventParentId] = useState(0);

	const [selectedTask, setSelectedTask] = useState<Event[]>([]);

	const [selectedSubEvent, setSelectedSubEvent] = useState<Event[]>([]);

	const [hierarchy, setHierarchy] = useState<Event[]>([]);

	// FETCH DATA, SORT & SET SUBEVENTS
	const { isLoading, error } = useFetch();
	// const { isLoading, error, sendRequest: fetchTasks } = useFetch();

	// FETCHING DATA FROM FIRESTORE
	useEffect(() => {
		const getSubEvents = async () => {
			let subEventData: DataInterface[] = [];
			const subEventsRef = collection(db, 'subEvents');
			const subEventQuery = query(
				subEventsRef,
				where('event.parentId', '==', fetchId)
			);

			const querySnapshot = await getDocs(subEventQuery);
			querySnapshot.forEach((doc) => subEventData.push(doc.get('event')));
			const allSubEvents = subEventData.map((data) => new Event(data));
			setSubEvents(allSubEvents);
		};
		getSubEvents();
	}, [fetchId]);

	// WATCH PAGENUMBER AND CLEAR STATES WHEN IT CHANGES
	const eventCtx = useContext(EventContext);
	const { pageNumber } = eventCtx;

	useEffect(() => {
		setSubEvents([]);
		setParentId(0);
		setSubEventParentId(0);
		setSelectedTask([]);
		setSelectedSubEvent([]);
		setHierarchy([]);
	}, [pageNumber]);

	useEffect(() => {
		setSubEventParentId(0);
		setSelectedSubEvent([]);
		setHierarchy([]);
	}, [selectedTask]);

	return (
		<SubEventContext.Provider
			value={{
				subEvents: subEvents,
				isLoading: isLoading,
				error: error,
				parentId: parentId,
				fetchId: fetchId,
				setParentId: setParentId,
				setFetchId: setFetchId,
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

// OPEN OPEN OPEN FETCH API FUNCTION USING USEFETCH HOOK
// useEffect(() => {
// 	const transformData = (taskData: {
// 		TotalRecordCount: number;
// 		Data: DataInterface[];
// 		PageNumber: number;
// 	}) => {
// 		const { Data: allTaskData } = taskData;
// 		console.log(allTaskData);
// 		// TODO PUSH ALL DATA TO FIREBASE HERE
// 		// NOTE SET PARENTID IN ORDER THAT SUBEVENT DATA GETS PUSHED TO PARENT EVET UNDER SUBEVENTS

// 		// const allTasks = allTaskData.map((data) => new Event(data));
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

// 		setSubEvents(allTasks);
// 	};

// 	fetchTasks(
// 		{
// 			url: `http://logviewer.jordaan/api/LogData/GetSubEvents?parentid=${fetchId}`,
// 		},
// 		transformData
// 	);
// }, [fetchTasks, fetchId]);
// CLOSE CLOSE CLOSE

// OPEN FUNCTION TO WRITE SUB-EVENT DATA TO FIRESTORE IN SEPARATE ROOT LEVEL COLLECTION
// useEffect(() => {
// 	subEvents.forEach((event) => {
// 		setDoc(doc(db, 'subEvents', `${event.id}`), { event });
// 	});
// }, [subEvents]);
// CLOSE	/////////////////////

// OPEN FUNCTION TO SET SUB-EVENT DATA TO SUB-COLLECTION UNDER ITS PARENT EVENT
// useEffect(() => {
// 	subEvents.forEach((event) => {
// 		setDoc(
// 			doc(
// 				db,
// 				'events',
// 				`${event.parentId}`,
// 				'subEvents',
// 				`${event.id}`
// 			),
// 			{
// 				event,
// 			}
// 		);
// 	});
// }, [subEvents]);
// CLOSE////////////////////////////////

// OPEN FUNCTION TO WRITE SUBEVENT DATA TO FIREBASE REALTIME DB
// useEffect(() => {
// 	subEvents.forEach((event) => {
// 		set(ref(db, 'subEvents/' + event.id), {
// 			event,
// 		});
// 	});
// }, [subEvents]);
// CLOSE

// OPEN POTENTIAL USE ONCE I HAVE THE APP ACTUALLY WORKING
// TODO USE EVENT CLASS TO MANAGE THE DATA SENT/RECEIVED FROM FIREBASE
// class City {
//     constructor (name, state, country ) {
//         this.name = name;
//         this.state = state;
//         this.country = country;
//     }
//     toString() {
//         return this.name + ', ' + this.state + ', ' + this.country;
//     }
// }

// // Firestore data converter
// const cityConverter = {
//     toFirestore: (city) => {
//         return {
//             name: city.name,
//             state: city.state,
//             country: city.country
//             };
//     },
//     fromFirestore: (snapshot, options) => {
//         const data = snapshot.data(options);
//         return new City(data.name, data.state, data.country);
//     }
// };

// import { doc, getDoc} from "firebase/firestore";

// const ref = doc(db, "cities", "LA").withConverter(cityConverter);
// const docSnap = await getDoc(ref);
// if (docSnap.exists()) {
//   // Convert to City object
//   const city = docSnap.data();
//   // Use a City instance method
//   console.log(city.toString());
// } else {
//   console.log("No such document!");
// }
// CLOSE

// NOTE ALTERNATE FIREBASE QUERIES
//OPEN SUCCESSFULLY GETS SPECIFIC DOC
// const getEvents = async () => {
// 	const docRef = doc(db, 'subEvents', '15001');
// 	const docSnap = await getDoc(docRef);

// 	if (docSnap.exists()) {
// 		console.log('Document data:', docSnap.data());
// 	} else {
// 		// doc.data() will be undefined in this case
// 		console.log('No such document!');
// 	}
// };
//CLOSE

// OPEN SUCCESSFULLY GETS ALL DOCS IN COLLECTION
// const getEvents = async () => {
// 	const eventsRef = collection(db, 'subEvents');

// 	const querySnapshot = await getDocs(eventsRef);
// 	querySnapshot.forEach((doc) => {
// 		console.log(doc.data());
// 	});
// };

//CLOSE

// NOTE WRITE FIREBASE SUBCOLLECTION EXAMPLE
// DocumentReference messageRef = db
// .collection("rooms").document("roomA")
// .collection("messages").document("message1");

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
