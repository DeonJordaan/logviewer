import DataFilterButton from './DataFilterButton';

import classes from './FilterMenuBar.module.css';

const FilterMenuBar = () => {
	return (
		<div className={classes['filter-menu-bar']}>
			<DataFilterButton text="PropIQ" />
			<DataFilterButton text="Sales" />
			<DataFilterButton text="SACompany" />
			<DataFilterButton text="MetroIQ" />
			<DataFilterButton text="AGentIQ" />
		</div>
	);
};

export default FilterMenuBar;
