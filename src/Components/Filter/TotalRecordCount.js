import './TotalRecordCount.css';

const TotalRecordCount = (props) => {
	return (
		<div className="total-records">
			<div>Total Records Available:</div>
			<div>{props.totalRecordCount}</div>
		</div>
	);
};

export default TotalRecordCount;
