import React from 'react';

import Button from '../ButtonBar/Button';

import classes from './Pagination.module.css';

const ButtonBar = (props) => {
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
			<Button
				onClick={props.firstPage}
				className={classes['double-left-arrow']}
			/>
			<Button
				onClick={props.prevPage}
				className={classes['left-arrow']}
			/>
			{/* <Pagination
				pageNumber={pageNumber}
				totalRecordCount={props.totalRecordCount}
			/> */}
			<div className="current-page">
				Page {props.pageNumber} of {props.totalPageCount}
			</div>
			<Button
				onClick={props.nextPage}
				className={classes['right-arrow']}
			/>
			<Button
				onClick={props.lastPage}
				className={classes['double-right-arrow']}
			/>
		</div>
	);
};

export default ButtonBar;
