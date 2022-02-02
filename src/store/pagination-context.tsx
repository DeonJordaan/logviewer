import React, { Dispatch, useContext } from 'react';
import EventContext from '../../store/event-context';

type PaginationContextObject = {
	getNextPage: Dispatch<ACTIONTYPES>;
	getPrevPage: Dispatch<ACTIONTYPES>;
	goToFirstPage: Dispatch<ACTIONTYPES>;
	goToLastPage: Dispatch<ACTIONTYPES>;
};

const PaginationContext = React.createContext<PaginationContextObject>({
	getNextPage: () => {},
	getPrevPage: () => {},
	goToFirstPage: () => {},
	goToLastPage: () => {},
});

export const initialState = {
	page: 1,
};

export type ACTIONTYPES =
	| { type: 'NEXT_PAGE'; payload: number }
	| { type: 'PREVIOUS_PAGE' }
	| { type: 'FIRST_PAGE' }
	| { type: 'LAST_PAGE'; payload: number };

//FIXME
const [pageNumber, dispatchPageNumber] = useReducer(
	paginationReducer,
	initialState
);

const paginationReducer = (
	// export const paginationReducer = (
	state: typeof initialState,
	action: ACTIONTYPES
) => {
	if (action.type === 'NEXT_PAGE' && state.page < action.payload) {
		return { page: state.page + 1 };
	}

	if (action.type === 'PREVIOUS_PAGE' && state.page > 1) {
		return { page: state.page - 1 };
	}

	if (action.type === 'FIRST_PAGE') {
		return { page: 1 };
	}

	if (action.type === 'LAST_PAGE') {
		return { page: action.payload };
	}
	return { page: state.page };
};

const Pagination: React.FC = () => {
	const eventCtx = useContext(EventContext);

	const totalPageCount = Math.ceil(eventCtx.totalRecordCount / 10);

	// Pagination Functions
	const getNextPage = () => {
		eventCtx.dispatchPageNumber({
			type: 'NEXT_PAGE',
			payload: totalPageCount,
		});
	};

	const getPrevPage = () => {
		eventCtx.dispatchPageNumber({ type: 'PREVIOUS_PAGE' });
	};

	const goToFirstPage = () => {
		eventCtx.dispatchPageNumber({ type: 'FIRST_PAGE' });
	};

	const goToLastPage = () => {
		eventCtx.dispatchPageNumber({
			type: 'LAST_PAGE',
			payload: totalPageCount,
		});
	};
};
