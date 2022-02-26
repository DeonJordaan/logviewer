import React, { useContext } from 'react';
import EventContext from '../../store/event-context';
import PaginationContext from '../../store/pagination-context';
import Button from '../ButtonBar/Button';
import classes from './Pagination.module.css';

const PaginationControl: React.FC = () => {
	const eventCtx = useContext(EventContext);
	const paginationCtx = useContext(PaginationContext);

	const goToFirstPage = paginationCtx.goToFirstPage;
	const getPrevPage = paginationCtx.getPrevPage;
	const getNextPage = paginationCtx.getNextPage;
	const goToLastPage = paginationCtx.goToLastPage;

	return (
		<div className={classes['button-bar']}>
			<Button onClick={goToFirstPage} className={'doubleLeftArrow'} />
			<Button onClick={getPrevPage} className={'leftArrow'} />
			<div className={classes['current-page']}>
				Page {eventCtx.pageNumber} of {eventCtx.totalPageCount}
			</div>
			<Button onClick={getNextPage} className={'rightArrow'} />
			<Button onClick={goToLastPage} className={'doubleRightArrow'} />
		</div>
	);
};

export default PaginationControl;
