import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAjUwHaR1h_BMPk4wODzlrAKjzvy38GFys',
	authDomain: 'logviewer-a5478.firebaseapp.com',
	projectId: 'logviewer-a5478',
	storageBucket: 'logviewer-a5478.appspot.com',
	messagingSenderId: '971564053589',
	appId: '1:971564053589:web:a2d87b8408025306ca90dc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;

const eventStore = doc(db, 'events/{data.id}');
const fbData = [];
const fbase = () => {
	fbData.push(
		tasks.map((data) => {
			{
				key: data.id;
				id: data.id;
				App: data.App;
				taskCode: data.taskCode;
				startTime: data.startTime;
				endTime: data.endTime;
				subEvents: data.subEvents;
				host: data.host;
				message: data.message;
				status: data.status;
			}
		})
	);
};
