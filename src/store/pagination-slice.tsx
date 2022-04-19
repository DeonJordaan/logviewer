import { createSlice } from '@reduxjs/toolkit';

interface PaginationState {
	pageNumber: number;
	pageSize: number;
}

const initialPaginationState: PaginationState = {
	pageNumber: 1,
	pageSize: 10,
};

const paginationSlice = createSlice({
	name: 'pagination',
	initialState: initialPaginationState,
	reducers: {
		NEXT_PAGE(state, action) {
			if (state.pageNumber < action.payload) {
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
		LAST_PAGE(state, action) {
			state.pageNumber = action.payload;
		},
	},
});

export const paginationActions = paginationSlice.actions;

export default paginationSlice;

// Function to get pagination data from Firebase. Refactored to calculate in the client.
// export const getPaginationData = () => {
// 	// TODO CHECK INFERRED TYPE OF dispatch BELOW

// 	return async (
// 		dispatch: (arg0: { payload: number; type: string }) => void
// 	) => {
// 		const getPagination = async () => {
// 			let pageData = {
// 				pageNumber: 0,
// 				// totalRecordCount: 0,
// 				// totalPageCount: 0,
// 				// pageSize: 0,
// 			};
// 			const paginationRef = collection(db, 'pagination');
// 			const paginationSnapshot = await getDocs(paginationRef);

// 			paginationSnapshot.forEach((doc) => {
// 				// const totalRecordCount = doc.get('totalRecordCount');
// 				// const pageSize = doc.get('pageSize');
// 				const pageNumber = doc.get('pageNumber');

// 				pageData = pageNumber;
// 			});
// 			return pageData;
// 		};

// 		try {
// 			const pagination = await getPagination();
// 			dispatch(paginationSlice.actions.SET_PAGES(pagination));
// 		} catch (error) {
// 			// TODO Complete error handling
// 			console.log(error);
// 		}
// 	};
// };
