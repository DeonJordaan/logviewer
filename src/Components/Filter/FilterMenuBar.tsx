import { useContext } from 'react';
import AppListContext from '../../store/app-list-context';
import DataFilterButton from './DataFilterButton';

import classes from './FilterMenuBar.module.css';

const FilterMenuBar: React.FC = () => {
	const appListCtx = useContext(AppListContext);

	let appListContent = <p>No applications available</p>;

	if (appListCtx.appList) {
		appListContent = (
			<div>
				{appListCtx.appList.map((app) => (
					<DataFilterButton text={app.Name} key={app.Id} />
				))}
			</div>
		);
	}

	return <div className={classes['filter-menu-bar']}>{appListContent}</div>;
};

export default FilterMenuBar;
