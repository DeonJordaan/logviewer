import './FilterMenuBar.css';
import DataFilterButton from './DataFilterButton';

const FilterMenuBar = () => {
	return (
		<div className="filter-menu-bar">
			<DataFilterButton />
			<DataFilterButton />
			<DataFilterButton />
			<DataFilterButton />
			<DataFilterButton />
		</div>
	);
};

export default FilterMenuBar;
