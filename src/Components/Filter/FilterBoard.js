import Card from '../UI/Card';
import SearchBar from '../SearchBar/SearchBar';
import PushButton from '../ButtonBar/PushButton';
import TotalRecordCount from './TotalRecordCount';
import FilterMenuBar from './FilterMenuBar';

import classes from './Filterboard.module.css';

const FilterBoard = (props) => {
	const totalRecordCount = props.totalRecords;

	return (
		<div className={classes['filter-board']}>
			<Card className={classes['filter-bar']}>
				<SearchBar />
				<PushButton
					className={classes['push-button']}
					// onClick={props.onGetData}
				/>
				<TotalRecordCount totalRecordCount={totalRecordCount} />
				{/* <TotalRecordCount totalRecords={props.totalRecords} /> */}
				<FilterMenuBar />
			</Card>
		</div>
	);
};

export default FilterBoard;
