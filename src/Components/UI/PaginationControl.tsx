import React, { useContext } from 'react';
import EventContext from '../../store/event-context';
import Button from '../ButtonBar/Button';
import classes from './Pagination.module.css';

import { usePagination } from 'use-pagination-firestore';
import db from '../../store/firebase';
import { query, collection, orderBy } from 'firebase/firestore';

const PaginationControl: React.FC = () => {
	const eventCtx = useContext(EventContext);
	// const paginationCtx = useContext(PaginationContext);

	// const goToFirstPage = paginationCtx.goToFirstPage;
	// const getPrevPage = paginationCtx.getPrevPage;
	// const getNextPage = paginationCtx.getNextPage;
	// const goToLastPage = paginationCtx.goToLastPage;

	const { items, isStart, isEnd, getPrev, getNext } = usePagination(
		query(collection(db, '/events'), orderBy('id')),
		{
			limit: 10,
		}
	);

	console.log(items);

	return (
		<div className={classes['button-bar']}>
			{/* <Button onClick={goToFirstPage} className={'doubleLeftArrow'} /> */}
			<Button
				onClick={getPrev}
				disabled={isStart}
				className={'leftArrow'}
			/>
			{/* <Button onClick={getPrevPage} className={'leftArrow'} /> */}
			<div className={classes['current-page']}>
				Page {eventCtx.pageNumber} of {eventCtx.totalPageCount}
			</div>
			<Button
				onClick={getNext}
				disabled={isEnd}
				className={'rightArrow'}
			/>
			{/* <Button onClick={getNextPage} className={'rightArrow'} /> */}
			{/* <Button onClick={goToLastPage} className={'doubleRightArrow'} /> */}
		</div>
	);
};

export default PaginationControl;
