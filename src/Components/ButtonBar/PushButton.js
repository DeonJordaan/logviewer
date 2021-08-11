import './PushButton.css';

const PushButton = (props) => {
	return (
		<button
			onClick={props.onClick}
			id="submitbutton"
			type="button"
			className="btn push-button"
		>
			<span className="shadow"></span>
			<span className="edge"></span>
			<span className="front">Fetch Data!</span>
		</button>
	);
};

export default PushButton;
