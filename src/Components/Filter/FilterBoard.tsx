import SearchBar from '../SearchBar/SearchBar';
// import PushButton from '../ButtonBar/PushButton';
// import TotalRecordCount from './TotalRecordCount';
// import FilterMenuBar from './FilterMenuBar';

import classes from './Filterboard.module.css';

const FilterBoard: React.FC = () => {
	return (
		<div className={classes['filter-board']}>
			<SearchBar />
			{/* <PushButton className={classes['push-button']} />
			<TotalRecordCount /> */}
			{/* <FilterMenuBar /> */}
		</div>
	);
};

export default FilterBoard;
