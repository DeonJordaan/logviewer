import React, { useContext } from 'react';

import EventContext from '../../Context/event-context';

import Button from '../ButtonBar/Button';

import classes from './Pagination.module.css';

const ButtonBar = (props) => {
	const eventCtx = useContext(EventContext);
	// const totalPageCount = Math.ceil(props.totalRecordCount / 10);

	// const [pageNumber, setPageNumber] = useState(props.pageNumber);
	// const [pageNumber, setPageNumber] = useState(1);

	// props.setPageNum(pageNumber);
	// console.log(pageNumber);

	// const getNextPage = () => {
	// 	// console.log(pageNumber);
	// 	setPageNumber((page) => page + 1);
	// 	props.getData();
	// };

	return (
		<div className={classes['button-bar']}>
			<Button onClick={props.firstPage} className={'doubleLeftArrow'} />
			<Button onClick={props.prevPage} className={'leftArrow'} />
			{/* <Pagination
				pageNumber={pageNumber}
				totalRecordCount={props.totalRecordCount}
			/> */}
			<div className="current-page">
				Page {eventCtx.pageNumber} of {props.totalPageCount}
			</div>
			<Button onClick={props.nextPage} className={'rightArrow'} />
			<Button onClick={props.lastPage} className={'doubleRightArrow'} />
		</div>
	);
};

export default ButtonBar;
