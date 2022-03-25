import React from 'react';
import { eventActions } from '../../store/event-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { paginationActions } from '../../store/pagination-slice';
import { subEventActions } from '../../store/subevent-slice';
import Button from '../ButtonBar/Button';
import classes from './Pagination.module.css';

const PaginationControl: React.FC = () => {
	const dispatch = useAppDispatch();
	const { pageNumber, totalPageCount } = useAppSelector(
		(state) => state.pagination
	);
	// const { pageNumber, totalPageCount } = useAppSelector(
	// 	(state) => state.pagination
	// );
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
		dispatch(paginationActions.NEXT_PAGE());
		reset();
	};
	const goToLastPage = () => {
		dispatch(paginationActions.LAST_PAGE());
		reset();
	};

	return (
		<div className={classes['button-bar']}>
			<Button onClick={goToFirstPage} className={'doubleLeftArrow'} />
			<Button onClick={getPrevPage} className={'leftArrow'} />
			<div className={classes['current-page']}>
				Page {pageNumber} of {totalPageCount}
			</div>
			<Button onClick={getNextPage} className={'rightArrow'} />
			<Button onClick={goToLastPage} className={'doubleRightArrow'} />
		</div>
	);
};

export default PaginationControl;
