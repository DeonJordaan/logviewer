import React from 'react';

import {
	CaretDoubleLeft,
	CaretDoubleRight,
	CaretLeft,
	CaretRight,
} from 'phosphor-react';

import { eventActions } from '../../store/event-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { paginationActions } from '../../store/pagination-slice';
import { subEventActions } from '../../store/subevent-slice';
// import Button from '../ButtonBar/Button';
import classes from './Pagination.module.css';

const PaginationControl: React.FC = () => {
	const dispatch = useAppDispatch();
	const { pageNumber, pageSize } = useAppSelector(
		(state) => state.pagination
	);
	const { totalRecordCount } = useAppSelector((state) => state.events);

	const totalPageCount: number = Math.ceil(totalRecordCount / pageSize);

	const reset = () => {
		dispatch(eventActions.EVENT_RESET());
		// dispatch(eventActions.SET_SELECTED_EVENT([]));
		dispatch(subEventActions.SET_SUB_EVENTS([]));
		dispatch(subEventActions.SET_FETCH_ID(0));
		dispatch(subEventActions.RESET_HIERARCHY());
		dispatch(subEventActions.SET_PARENT_ID(0));
		dispatch(subEventActions.SET_SELECTED_SUB_EVENT([]));
		dispatch(subEventActions.SET_SUB_EVENT_PARENT_ID(0));
		// dispatch(subEventActions.SUB_EVENT_RESET());
	};

	const goToFirstPage = () => {
		dispatch(paginationActions.FIRST_PAGE());
		reset();
	};
	const getPrevPage = () => {
		dispatch(paginationActions.PREV_PAGE());
		reset();
	};
	const getNextPage = () => {
		dispatch(paginationActions.NEXT_PAGE(totalPageCount));
		reset();
	};
	const goToLastPage = () => {
		dispatch(paginationActions.LAST_PAGE(totalPageCount));
		reset();
	};

	return (
		<div className={classes['button-bar']}>
			<button className={classes['arrow-button']} onClick={goToFirstPage}>
				<CaretDoubleLeft />
			</button>
			<button className={classes['arrow-button']} onClick={getPrevPage}>
				<CaretLeft />
			</button>
			<div className={classes['current-page']}>
				Page {pageNumber} of {totalPageCount}
			</div>
			<button className={classes['arrow-button']} onClick={getNextPage}>
				<CaretRight />
			</button>
			<button className={classes['arrow-button']} onClick={goToLastPage}>
				<CaretDoubleRight />
			</button>
		</div>
	);
};

export default PaginationControl;
