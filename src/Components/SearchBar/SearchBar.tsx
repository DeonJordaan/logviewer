import { useAppDispatch } from '../../store/hooks';
import { eventActions } from '../../store/event-slice';

import { Moon, SunDim } from 'phosphor-react';

import Dropdown from './Dropdown';
import TotalRecordCount from './TotalRecordCount';

import classes from './SearchBar.module.css';

const SearchBar: React.FC<{
	theme: string;
	switchTheme: () => void;
}> = (props) => {
	const dispatch = useAppDispatch();

	const dateChangeHandler = (event: { target: { value: any } }) => {
		dispatch(eventActions.SET_DATE(event.target.value));
	};

	const theme = props.theme;
	let themeContent = (
		<div className={classes.theme} onClick={props.switchTheme}>
			<SunDim size={20} />
			<span>Day</span>
		</div>
	);

	if (theme === 'light') {
		themeContent = (
			<div className={classes.theme} onClick={props.switchTheme}>
				<Moon size={20} />
				<span>Night</span>
			</div>
		);
	}

	return (
		<div className={classes.search__bar}>
			<div className={classes['search__inputs']}>
				<Dropdown label="Application" />
				<Dropdown label="Host" />
				<div className={classes['search-input']}>
					<label>Minimum Date</label>
					<input onChange={dateChangeHandler} type="date"></input>
				</div>
				<TotalRecordCount />
			</div>
			<div className="theme__switch">
				<span className={classes.lightbulb}>{themeContent}</span>
			</div>
		</div>
	);
};

export default SearchBar;
