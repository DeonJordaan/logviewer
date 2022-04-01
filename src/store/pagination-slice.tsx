import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase';

interface PaginationState {
	totalRecordCount: number;
	totalPageCount: number;
	pageNumber: number;
}

const initialPaginationState: PaginationState = {
	totalRecordCount: 0,
	totalPageCount: 0,
	pageNumber: 0,
};

const paginationSlice = createSlice({
	name: 'pagination',
	initialState: initialPaginationState,
	reducers: {
		SET_PAGES(state, action: PayloadAction<PaginationState>) {
			state.pageNumber = action.payload.pageNumber;
			state.totalPageCount = action.payload.totalPageCount;
			state.totalRecordCount = action.payload.totalRecordCount;
		},
		NEXT_PAGE(state) {
			if (state.pageNumber < state.totalPageCount) {
				state.pageNumber++;
			}
		},
		PREV_PAGE(state) {
			if (state.pageNumber > 1) {
				state.pageNumber--;
			}
		},
		FIRST_PAGE(state) {
			state.pageNumber = 1;
		},
		LAST_PAGE(state) {
			state.pageNumber = state.totalPageCount;
		},
	},
});

export const getPaginationData = () => {
	// TODO CHECK INFERRED TYPE OF dispatch BELOW

	return async (
		dispatch: (arg0: { payload: PaginationState; type: string }) => void
	) => {
		const getPagination = async () => {
			let pageData = {
				pageNumber: 0,
				totalRecordCount: 0,
				totalPageCount: 0,
			};
			const paginationRef = collection(db, 'pagination');
			const paginationSnapshot = await getDocs(paginationRef);

			paginationSnapshot.forEach((doc) => {
				const totalRecordCount = doc.get('totalRecordCount');
				// console.log(totalRecordCount);
				const pageSize = doc.get('pageSize');
				// console.log(pageSize);
				const pageNumber = doc.get('pageNumber');
				// console.log(pageNumber);

				pageData = {
					pageNumber: pageNumber,
					totalRecordCount: totalRecordCount,
					totalPageCount: Math.ceil(totalRecordCount / pageSize),
				};
			});
			// console.log(pageData);
			return pageData;
		};

		try {
			const pagination = await getPagination();
			dispatch(paginationSlice.actions.SET_PAGES(pagination));
		} catch (error) {
			// TODO Complete error handling
			console.log(error);
		}
	};
};

export const paginationActions = paginationSlice.actions;

export default paginationSlice;
