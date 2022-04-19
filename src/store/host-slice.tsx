import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Host from '../types/host';
import db from './firebase';

interface HostState {
	hosts: Host[];
}

const initialHostState: HostState = {
	hosts: [],
};

const hostSlice = createSlice({
	name: 'host',
	initialState: initialHostState,
	reducers: {
		SET_HOSTS(state, action: PayloadAction<Host[]>) {
			state.hosts = action.payload;
		},
	},
});

export const fetchHostData = () => {
	return async (
		dispatch: (arg0: { payload: Host[]; type: string }) => void
	) => {
		const getHosts = async () => {
			let hostData: Host[] = [];

			const hostRef = collection(db, 'hosts');

			const querySnapshot = await getDocs(hostRef);

			querySnapshot.forEach((doc) => hostData.push(doc.get('host')));
			console.log(hostData);

			const allHosts = hostData.map((host) => {
				return {
					hostName: host.hostName,
					Id: host.Id,
				};
			});

			return allHosts;
		};

		try {
			const hostData = await getHosts();
			dispatch(hostSlice.actions.SET_HOSTS(hostData));
		} catch (error) {
			// TODO Complete error handling
			console.log(error);
		}
	};
};

export const hostSliceActions = hostSlice.actions;

export default hostSlice;
