import SearchInput from './SearchInput';

import classes from './SearchBar.module.css';

const SearchBar: React.FC = () => {
	return (
		<div className={classes.searchbar}>
			<SearchInput />
		</div>
	);
};

export default SearchBar;
