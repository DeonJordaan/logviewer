import SearchInput from './SearchInput';

import classes from './SearchBar.module.css';

const SearchBar = () => {
	return (
		<div className={classes.searchbar}>
			<SearchInput />
		</div>
	);
};

export default SearchBar;
