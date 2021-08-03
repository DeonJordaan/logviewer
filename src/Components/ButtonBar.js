import './ButtonBar.css';
import Button from './Button';
import PushButton from './PushButton';

const ButtonBar = () => {
	return (
		<div className="button-bar">
			<Button className="double-left-arrow" />
			<Button className="left-arrow" />
			<PushButton className="push-button" />
			<Button className="right-arrow" />
			<Button className="double-right-arrow" />
		</div>
	);
};

export default ButtonBar;
