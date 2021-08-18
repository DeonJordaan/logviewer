import React, { useState } from 'react';

import Button from '../ButtonBar/Button';
import './PaginationNew.css';

const ButtonBar = (props) => {
	const totalPageCount = Math.ceil(props.totalRecordCount / 10);

	const [pageNumber, setPageNumber] = useState(1);

	const getNextPage = () => {
		// console.log(pageNumber);
		setPageNumber((page) => page + 1);
		props.getData();
	};

	return (
		<div className="button-bar">
			<Button className="double-left-arrow" />
			<Button className="left-arrow" />
			{/* <Pagination
				pageNumber={pageNumber}
				totalRecordCount={props.totalRecordCount}
			/> */}
			<div className="current-page">
				Page {pageNumber} of {totalPageCount}
			</div>
			<Button onClick={getNextPage} className="right-arrow" />
			<Button className="double-right-arrow" />
		</div>
	);
};

export default ButtonBar;
