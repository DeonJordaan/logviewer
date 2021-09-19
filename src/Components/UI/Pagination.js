import React, { useEffect, useContext } from 'react';

import EventContext from '../../Context/event-context';
import Button from '../ButtonBar/Button';
import classes from './Pagination.module.css';

export const paginationReducer = (state, action) => {
	if (action.type === 'NEXT_PAGE' && state.value < action.payload.value) {
		return { value: state.value + 1 };
	}

	if (action.type === 'PREVIOUS_PAGE' && state.value > 0) {
		return { value: state.value - 1 };
	}

	if (action.type === 'FIRST_PAGE') {
		return { value: 1 };
	}

	if (action.type === 'LAST_PAGE') {
		return { value: action.payload.value };
	}
};

const Pagination = (props) => {
	const eventCtx = useContext(EventContext);

	const currentPage = eventCtx.pageNumber;
	const getEventDataHere = eventCtx.getEventData;

	const totalPageCount = Math.ceil(eventCtx.totalRecordCount / 10);

	const getNextPage = () => {
		eventCtx.dispatchPageNumber({
			type: 'NEXT_PAGE',
			payload: totalPageCount,
		});
		// eventCtx.setPageNumber((page) => page + 1);
	};

	const getPrevPage = () => {
		eventCtx.dispatchPageNumber({ type: 'PREVIOUS_PAGE' });
		// eventCtx.setPageNumber((page) => page - 1);
	};

	const goToFirstPage = () => {
		eventCtx.dispatchPageNumber({ type: 'FIRST_PAGE' });
		// eventCtx.setPageNumber((page) => (page = 1));
	};

	const goToLastPage = () => {
		eventCtx.dispatchPageNumber({
			type: 'LAST_PAGE',
			payload: totalPageCount,
		});
		// eventCtx.setPageNumber((page) => (page = totalPageCount));
	};

	useEffect(() => {
		getEventDataHere();
	}, [getEventDataHere, currentPage]);

	return (
		<div className={classes['button-bar']}>
			<Button onClick={goToFirstPage} className={'doubleLeftArrow'} />
			<Button onClick={getPrevPage} className={'leftArrow'} />
			<div className="current-page">
				Page {eventCtx.pageNumber} of {totalPageCount}
			</div>
			<Button onClick={getNextPage} className={'rightArrow'} />
			<Button onClick={goToLastPage} className={'doubleRightArrow'} />
		</div>
	);
};

export default Pagination;
