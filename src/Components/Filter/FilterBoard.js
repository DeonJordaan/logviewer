import './Filterboard.css';

import Card from '../UI/Card';
import SearchBar from '../SearchBar/SearchBar';
import PushButton from '../ButtonBar/PushButton';
import FilterMenuBar from './FilterMenuBar';

const FilterBoard = (props) => {
	return (
		<div className="filter-board">
			<Card className="filter-bar">
				<SearchBar />
				<PushButton className="push-button" onClick={props.onGetData} />
				<FilterMenuBar />
			</Card>
		</div>
	);
};

export default FilterBoard;
