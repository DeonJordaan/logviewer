import './Filterboard.css';

import Card from '../UI/Card';
import SearchBar from '../SearchBar/SearchBar';
import PushButton from '../ButtonBar/PushButton';
import TotalRecordCount from './TotalRecordCount';
import FilterMenuBar from './FilterMenuBar';

const FilterBoard = (props) => {
	const totalRecordCount = props.totalRecords;

	return (
		<div className="filter-board">
			<Card className="filter-bar">
				<SearchBar />
				<PushButton className="push-button" onClick={props.onGetData} />
				<TotalRecordCount totalRecordCount={totalRecordCount} />
				{/* <TotalRecordCount totalRecords={props.totalRecords} /> */}
				<FilterMenuBar />
			</Card>
		</div>
	);
};

export default FilterBoard;
