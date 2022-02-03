import React, { useContext } from 'react';
import EventContext from '../store/event-context';

type PaginationContextObject = {
	// pageNumber: number | undefined;
	// totalPageCount: number | undefined;
	getNextPage: () => void;
	getPrevPage: () => void;
	goToFirstPage: () => void;
	goToLastPage: () => void;
	// getNextPage: Dispatch<ACTIONTYPES>;
	// getPrevPage: Dispatch<ACTIONTYPES>;
	// goToFirstPage: Dispatch<ACTIONTYPES>;
	// goToLastPage: Dispatch<ACTIONTYPES>;
};

const PaginationContext = React.createContext<PaginationContextObject>({
	// pageNumber: 1,
	// totalPageCount: 0,
	getNextPage: () => {},
	getPrevPage: () => {},
	goToFirstPage: () => {},
	goToLastPage: () => {},
});

export const PaginationContextProvider: React.FC = (props) => {
	const eventCtx = useContext(EventContext);
	const setPageNumber = eventCtx.setPageNumber;
	const totalPageCount = eventCtx.totalPageCount;
	const pageNumber = eventCtx.pageNumber;

	// Pagination Functions
	const getNextPage = () => {
		if (pageNumber < totalPageCount) {
			setPageNumber((prevPage) => {
				return prevPage + 1;
			});
		}
	};

	const getPrevPage = () => {
		if (pageNumber > 1) {
			setPageNumber((prevPage) => {
				return prevPage - 1;
			});
		}
	};

	const goToFirstPage = () => {
		setPageNumber(1);
	};

	const goToLastPage = () => {
		setPageNumber(totalPageCount);
	};

	return (
		<PaginationContext.Provider
			value={{
				// pageNumber: pageNumber,
				// totalPageCount: totalPageCount,
				getNextPage: getNextPage,
				getPrevPage: getPrevPage,
				goToFirstPage: goToFirstPage,
				goToLastPage: goToLastPage,
			}}
		>
			{props.children}
		</PaginationContext.Provider>
	);
};

export default PaginationContext;

// COMMENT REMOVED REDUCER CODE
// export type ACTIONTYPES =
// 	| { type: 'NEXT_PAGE'; payload: number }
// 	| { type: 'PREVIOUS_PAGE' }
// 	| { type: 'FIRST_PAGE' }
// 	| { type: 'LAST_PAGE'; payload: number };

// const paginationReducer = (
// 	state: typeof initialState,
// 	action: ACTIONTYPES
// ) => {
// 	if (action.type === 'NEXT_PAGE' && state.page < action.payload) {
// 		return { page: state.page + 1 };
// 	}

// 	if (action.type === 'PREVIOUS_PAGE' && state.page > 1) {
// 		return { page: state.page - 1 };
// 	}

// 	if (action.type === 'FIRST_PAGE') {
// 		return { page: 1 };
// 	}

// 	if (action.type === 'LAST_PAGE') {
// 		return { page: action.payload };
// 	}
// 	return { page: state.page };
// };

// export const initialState = {
// 	page: 1,
// };
//////////////////////
// const getNextPage = () => {
// 	dispatchPageNumber({
// 		type: 'NEXT_PAGE',
// 		payload: totalPageCount,
// 	});
// };

// const getPrevPage = () => {
// 	dispatchPageNumber({ type: 'PREVIOUS_PAGE' });
// };

// const goToFirstPage = () => {
// 	// const goToFirstPage = (event: React.MouseEvent) => {
// 	dispatchPageNumber({ type: 'FIRST_PAGE' });
// };

// const goToLastPage = () => {
// 	dispatchPageNumber({
// 		type: 'LAST_PAGE',
// 		payload: totalPageCount,
// 	});
// };
