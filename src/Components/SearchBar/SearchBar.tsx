import { useAppSelector } from '../../store/hooks';
import PushButton from '../ButtonBar/PushButton';
import Dropdown from '../Filter/Dropdown';
import TotalRecordCount from '../Filter/TotalRecordCount';
import classes from './SearchBar.module.css';

const SearchBar: React.FC = () => {
	const { applications } = useAppSelector((state) => state.applications);

	const appNames = applications.map((app) => app as unknown as string);

	//FIXME event type declaration
	// const selectChangeHandler = (event: FormEvent<Element>) => {
	// const selectChangeHandler = (event: { target: { value: any; }; }) => {
	// 	console.log(event.target.value);
	// };

	return (
		<div className={classes.search__bar}>
			<Dropdown
				names={appNames}
				value={appNames || ''}
				// onChange={selectChangeHandler}
			/>

			<div className={classes['search-input']}>
				<label>Application</label>
				<input type="text"></input>
			</div>
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
