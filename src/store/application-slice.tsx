import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Application from '../types/application';
import db from './firebase';

interface AppState {
	applications: Application[];
}

const initialAppState: AppState = {
	applications: [],
};

const appSlice = createSlice({
	name: 'applications',
	initialState: initialAppState,
	reducers: {
		SET_APPS(state, action: PayloadAction<Application[]>) {
			state.applications = action.payload;
		},
	},
});

export const fetchAppData = () => {
	return async (
		dispatch: (arg0: { payload: Application[]; type: string }) => void
	) => {
		const getApps = async () => {
			let appData: Application[] = [];

			const appsRef = collection(db, 'applications');

			const querySnapshot = await getDocs(appsRef);

			querySnapshot.forEach((doc) =>
				appData.push(doc.get('application'))
			);
			console.log(appData);

			const allApps = appData.map((app) => app.appName as unknown as Application);
			console.log(allApps);

			return allApps;
			// return appData;
		};

		try {
			const appsData = await getApps();
			dispatch(appSlice.actions.SET_APPS(appsData));
		} catch (error) {
			// TODO Complete error handling
			console.log(error);
		}
	};
};

export const appSliceActions = appSlice.actions;

export default appSlice;
