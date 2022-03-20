import { useAppSelector } from '../../store/hooks';

import classes from './TotalRecordCount.module.css';

const TotalRecordCount: React.FC = () => {
	const { totalRecordCount } = useAppSelector((state) => state.pagination);

	return (
		<div className={classes['total-records']}>
			<div>Total Records Available:</div>
			<div>{totalRecordCount}</div>
		</div>
	);
};

export default TotalRecordCount;
