import './ButtonBar.css';
import Button from './Button';
import PushButton from './PushButton';

const ButtonBar = (props) => {
	return (
		<div className="button-bar">
			<Button className="double-left-arrow" />
			<Button className="left-arrow" />
			<PushButton className="push-button" onClick={props.onGetData} />
			<Button className="right-arrow" />
			<Button className="double-right-arrow" />
		</div>
	);
};

export default ButtonBar;
