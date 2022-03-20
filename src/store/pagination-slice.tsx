import {
	ActionCreatorWithPayload,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase';
import eventSlice from './event-slice';

interface PaginationState {
	totalRecordCount: number;
	totalPageCount: number;
	pageNumber: number;
}

const initialPaginationState: PaginationState = {
	totalRecordCount: 0,
	totalPageCount: 0,
	pageNumber: 1,
};

const paginationSlice = createSlice({
	name: 'pagination',
	initialState: initialPaginationState,
	reducers: {
		SET_PAGES(
			state = initialPaginationState,
			action: PayloadAction<number>
		) {
			state.totalPageCount = action.payload;
			state.totalRecordCount = action.payload;
		},
		NEXT_PAGE(state = initialPaginationState) {
			if (state.pageNumber < state.totalPageCount) {
				state.pageNumber++;
			}
		},
		PREV_PAGE(state = initialPaginationState) {
			if (state.pageNumber > 1) {
				state.pageNumber--;
			}
		},
		FIRST_PAGE(state = initialPaginationState) {
			state.pageNumber = 1;
		},
		LAST_PAGE(state = initialPaginationState) {
			state.pageNumber = state.totalPageCount;
		},
	},
});

export const getPaginationData = () => {
	// TODO CHECK INFERRED TYPE OF dispatch BELOW
	return async (
		dispatch: (arg0: ActionCreatorWithPayload<number, string>) => {
			(arg0: { totalRecordCount: number; totalPagecount: number }): void;
			new (): any;
		}
	) => {
		const getPagination = async () => {
			let pageData = {
				totalRecordCount: 0,
				totalPagecount: 0,
			};
			const paginationRef = collection(db, 'pagination');
			const paginationSnapshot = await getDocs(paginationRef);

			paginationSnapshot.forEach((doc) => {
				const totalRecordCount = doc.get('totalRecordCount');
				const pageSize = doc.get('pageSize');

				pageData = {
					totalRecordCount: totalRecordCount,
					totalPagecount: Math.ceil(totalRecordCount / pageSize),
				};
			});
			return pageData;
		};

		try {
			const pagination = await getPagination();
			dispatch(paginationSlice.actions.SET_PAGES)({
				totalRecordCount: pagination.totalRecordCount,
				totalPagecount: pagination.totalPagecount,
			});
			console.log(eventSlice);
		} catch (error) {
			// TODO COmplete error handling
			console.log(error);
		}
	};
};

export const paginationActions = paginationSlice.actions;

export default paginationSlice;
