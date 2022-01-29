import { useContext } from 'react';
import AppListContext from '../../store/app-list-context';
import Dropdown from '../Filter/Dropdown';
import classes from './SearchInput.module.css';

const SearchInput: React.FC = () => {
	const appListCtx = useContext(AppListContext);

	const appNames = appListCtx.apps;

	return (
		<div className={classes['search-wrapper']}>
			<div>
				<Dropdown
					names={appNames}
					// name={appName}
					value={appNames || ''}
					// onChange={productNameChangeHandler}
				/>
			</div>
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
