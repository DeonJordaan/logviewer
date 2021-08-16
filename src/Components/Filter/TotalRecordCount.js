import './TotalRecordCount.css';

const TotalRecordCount = (props) => {
	console.log(props.totalRecordCount);
	return (
		<div className="total-records">
			<div>Total Records Available:</div>
			<div>{props.totalRecordCount}</div>
		</div>
	);
};

export default TotalRecordCount;
