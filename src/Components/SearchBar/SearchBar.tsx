// import PushButton from '../ButtonBar/PushButton';
import { eventActions } from '../../store/event-slice';
import { useAppDispatch } from '../../store/hooks';
import Dropdown from '../Filter/Dropdown';
import TotalRecordCount from '../Filter/TotalRecordCount';
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
			{/* <PushButton className={classes['push-button']} /> */}
			<TotalRecordCount />
		</div>
	);
};

export default SearchBar;
