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
