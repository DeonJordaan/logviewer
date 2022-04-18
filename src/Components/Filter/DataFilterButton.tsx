import classes from './DataFilterButton.module.css';

const DataFilterButton: React.FC<{
	text: string;
}> = (props) => {
	return (
		<div>
			<button className={classes['filter-button']}>{props.text}</button>
		</div>
	);
};

export default DataFilterButton;
