import './Pagination.css';

const Pagination = () => {
	const totalPageCount = 5;

	const currentPage = 3;

	return (
		<div className="current-page">
			Page {currentPage} of {totalPageCount}
		</div>
	);
};

export default Pagination;
