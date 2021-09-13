import classes from './SearchInput.module.css';

const SearchInput = () => {
	return (
		<div className={classes['search-wrapper']}>
			<div className={classes['search-input']}>
				<label>Application</label>
				<input type="text"></input>
			</div>
			<div className={classes['search-input']}>
				<label>Minimum Date</label>
				<input type="date"></input>
			</div>
		</div>
	);
};

export default SearchInput;
