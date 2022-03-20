import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { paginationActions } from '../../store/pagination-slice';
import Button from '../ButtonBar/Button';
import classes from './Pagination.module.css';

const PaginationControl: React.FC = () => {
	const dispatch = useAppDispatch();
	const { pageNumber, totalPageCount } = useAppSelector(
		(state) => state.pagination
	);

	const goToFirstPage = () => {
		dispatch(paginationActions.FIRST_PAGE);
	};
	const getPrevPage = () => {
		dispatch(paginationActions.PREV_PAGE);
	};
	const getNextPage = () => {
		dispatch(paginationActions.NEXT_PAGE);
	};
	const goToLastPage = () => {
		dispatch(paginationActions.LAST_PAGE);
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
