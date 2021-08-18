// import React, { useState } from 'react';

import './Pagination.css';

const Pagination = (props) => {
	const totalPageCount = Math.ceil(props.totalRecordCount / 10);

	const currentPage = props.pageNumber;

	return (
		<div className="current-page">
			Page {currentPage} of {totalPageCount}
		</div>
	);
};

export default Pagination;
