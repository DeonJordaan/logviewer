import { useAppSelector } from '../../store/hooks';
import PushButton from '../ButtonBar/PushButton';
import Dropdown from '../Filter/Dropdown';
import TotalRecordCount from '../Filter/TotalRecordCount';
import classes from './SearchInput.module.css';

const SearchInput: React.FC = () => {
	const { applications } = useAppSelector((state) => state.applications);

	const appNames = applications.map((app) => app as unknown as string);

	return (
		<div className={classes['search-wrapper']}>
			<Dropdown
				names={appNames}
				value={appNames || ''}
				// onChange={productNameChangeHandler}
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

export default SearchInput;
