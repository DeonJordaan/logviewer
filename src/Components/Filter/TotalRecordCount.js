import classes from './TotalRecordCount.module.css';

const TotalRecordCount = (props) => {
	return (
		<div className={classes['total-records']}>
			<div>Total Records Available:</div>
			<div>{props.totalRecordCount}</div>
		</div>
	);
};

export default TotalRecordCount;
