import { eventActions } from '../../store/event-slice';
import { useAppDispatch } from '../../store/hooks';
import Dropdown from './Dropdown';
import TotalRecordCount from './TotalRecordCount';
import classes from './SearchBar.module.css';

const SearchBar: React.FC = () => {
	const dispatch = useAppDispatch();

	const dateChangeHandler = (event: { target: { value: any } }) => {
		dispatch(eventActions.SET_DATE(event.target.value));
	};

	return (
		<div className={classes.search__bar}>
			<Dropdown label="Application" />
			<Dropdown label="Host" />
			<div className={classes['search-input']}>
				<label>Minimum Date</label>
				<input onChange={dateChangeHandler} type="date"></input>
			</div>
			<TotalRecordCount />
		</div>
	);
};

export default SearchBar;
