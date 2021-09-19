import classes from './DataFilterButton.module.css';

const DataFilterButton = (props) => {
	return (
		<div>
			<button className={classes['filter-button']}>{props.text}</button>
		</div>
	);
};

export default DataFilterButton;
