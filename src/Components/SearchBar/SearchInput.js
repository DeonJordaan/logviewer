import './SearchInput.css';

const SearchInput = () => {
	return (
		<div className="search-wrapper">
			<div className="search-input">
				<label>Application</label>
				<input type="text"></input>
			</div>
			<div className="search-input">
				<label>Minimum Date</label>
				<input type="date"></input>
			</div>
		</div>
	);
};

export default SearchInput;
