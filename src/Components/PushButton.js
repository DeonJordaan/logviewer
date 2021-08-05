import './PushButton.css';

const PushButton = (props) => {
	return (
		<button
			onClick={props.onClick}
			id="submitbutton"
			type="button"
			className="btn push-button" //background-scale <removed class, not sure what it does
		>
			<span className="shadow"></span>
			<span className="edge"></span>
			<span className="front">Git Some Data!</span>
		</button>
	);
};

export default PushButton;
