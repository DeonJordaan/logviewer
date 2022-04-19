import { useAppSelector } from '../../store/hooks';
import classes from './TotalRecordCount.module.css';

const TotalRecordCount: React.FC = () => {
	const { totalRecordCount } = useAppSelector((state) => state.events);

	return (
		<div className={classes['total-records']}>
			<div>Total Records Available: {totalRecordCount}</div>
		</div>
	);
};

export default TotalRecordCount;
