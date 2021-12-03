import DataFilterButton from './DataFilterButton';

import classes from './FilterMenuBar.module.css';

const FilterMenuBar: React.FC = () => {
	return (
		<div className={classes['filter-menu-bar']}>
			<DataFilterButton text="PropIQ" />
			<DataFilterButton text="Sales" />
			<DataFilterButton text="SACompany" />
			<DataFilterButton text="MetroIQ" />
			<DataFilterButton text="AgentIQ" />
		</div>
	);
};

export default FilterMenuBar;
