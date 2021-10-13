import React, { useContext } from 'react';

import EventContext from '../../store/event-context';

import Button from '../ButtonBar/Button';

import classes from './Pagination.module.css';

export const paginationReducer = (state, action) => {
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

const Pagination = (props) => {
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
		console.log(eventCtx.pageNumber);
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

	return (
		<div className={classes['button-bar']}>
			<Button onClick={goToFirstPage} className={'doubleLeftArrow'} />
			<Button onClick={getPrevPage} className={'leftArrow'} />
			<div className={classes['current-page']}>
				Page {eventCtx.pageNumber} of {totalPageCount}
			</div>
			<Button onClick={getNextPage} className={'rightArrow'} />
			<Button onClick={goToLastPage} className={'doubleRightArrow'} />
		</div>
	);
};

export default Pagination;
