import DataFilterButton from './DataFilterButton';

import classes from './FilterMenuBar.module.css';

const FilterMenuBar = () => {
	return (
		<div className={classes['filter-menu-bar']}>
			<DataFilterButton />
			<DataFilterButton />
			<DataFilterButton />
			<DataFilterButton />
			<DataFilterButton />
		</div>
	);
};

export default FilterMenuBar;
