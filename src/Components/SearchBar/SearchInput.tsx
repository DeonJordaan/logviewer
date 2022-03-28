// import { useAppSelector } from '../../store/hooks';
// import Dropdown from '../Filter/Dropdown';
import classes from './SearchInput.module.css';

const SearchInput: React.FC = () => {
	// const { applications } = useAppSelector((state) => state.applications);

	// const { appName } = applications;

	return (
		<div className={classes['search-wrapper']}>
			{/* <div>
				<Dropdown
					names={appName}
					// name={appName}
					value={appName || ''}
					// onChange={productNameChangeHandler}
				/>
			</div> */}
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
