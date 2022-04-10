import PushButton from '../ButtonBar/PushButton';
import Dropdown from '../Filter/Dropdown';
import TotalRecordCount from '../Filter/TotalRecordCount';
import classes from './SearchBar.module.css';

const SearchBar: React.FC = () => {
	return (
		<div className={classes.search__bar}>
			<Dropdown label="Application" />
			<Dropdown label="Host" />
			<div className={classes['search-input']}>
				<label>Minimum Date</label>
				<input type="date"></input>
			</div>
			<PushButton className={classes['push-button']} />
			<TotalRecordCount />
		</div>
	);
};

export default SearchBar;
