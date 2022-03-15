// const getNextPage = () => {
// 	if (pageNumber < totalPageCount) {
// 		setPageNumber((prevPage) => {
// 			return prevPage + 1;
// 		});
// 	}
// };

// const getPrevPage = () => {
// 	if (pageNumber > 1) {
// 		setPageNumber((prevPage) => {
// 			return prevPage - 1;
// 		});
// 	}
// };

// const goToFirstPage = () => {
// 	setPageNumber(1);
// };

// const goToLastPage = () => {
// 	setPageNumber(totalPageCount);
// };

// return (
// 	<PaginationContext.Provider
// 		value={{
// 			// pageNumber: pageNumber,
// 			// totalPageCount: totalPageCount,
// 			getNextPage: getNextPage,
// 			getPrevPage: getPrevPage,
// 			goToFirstPage: goToFirstPage,
// 			goToLastPage: goToLastPage,
// 		}}
// 	>
// 		{props.children}
// 	</PaginationContext.Provider>
// );
